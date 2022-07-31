<?php

namespace App\EventSubscriber;

use CoopTilleuls\ForgotPasswordBundle\Event\CreateTokenEvent;
use CoopTilleuls\ForgotPasswordBundle\Event\UpdatePasswordEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Twig\Environment;

class ForgotPasswordEventSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private TokenStorageInterface  $tokenStorage,
        private MailerInterface        $mailer,
        private EntityManagerInterface $entityManager,
        private Environment            $twig,
        private RouterInterface        $router,
    )
    {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::REQUEST => 'onKernelRequest',
            CreateTokenEvent::class => 'onCreateToken',
            UpdatePasswordEvent::class => 'onUpdatePassword',
        ];
    }

    public function onKernelRequest(RequestEvent $event): void
    {
        if (!$event->isMainRequest() || !preg_match('/^coop_tilleuls_forgot_password/i', $event->getRequest()->get('_route'))
        ) {
            return;
        }

        /** @var TokenInterface|null $token */
        $token = $this->tokenStorage->getToken();
        if (null !== $token && $token->getUser() instanceof UserInterface) {
            throw new AccessDeniedHttpException;
        }
    }

    public function onCreateToken(CreateTokenEvent $event): void
    {
        $passwordToken = $event->getPasswordToken();
        $user = $passwordToken->getUser();

        $message = (new Email())
            ->to($user->getEmail())
            ->subject('QuizHub - Reset your password')
            ->html($this->twig->render(
                'emails/reset-password.html.twig',
                [
                    'user' => $user,
                    'token' => $passwordToken,
                    'url' => $this->router->generate('coop_tilleuls_forgot_password.update', [
                        'tokenValue' => $passwordToken->getToken(),
                    ], RouterInterface::ABSOLUTE_URL),
                ]
            ));

        try {
            $this->mailer->send($message);
        } catch (TransportExceptionInterface $e) {
            throw new MessageSentFailedException('Something went wrong when sending the password reset email.', $e->getMessage());
        }
    }

    public function onUpdatePassword(UpdatePasswordEvent $event): void
    {
        $passwordToken = $event->getPasswordToken();
        $user = $passwordToken->getUser();
        $user->setPlainPassword($event->getPassword());

        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }
}