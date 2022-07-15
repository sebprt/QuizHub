<?php

namespace App\Command;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\ChoiceQuestion;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[AsCommand(
    name: 'app:create-user',
    description: 'This command allows you to create an user.',
)]
class CreateUserCommand extends Command
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserPasswordHasherInterface $hasher
    ) {
        parent::__construct();
    }

    protected function configure(): void
    {
        $this
            ->addArgument('firstname', InputArgument::REQUIRED)
            ->addArgument('lastname', InputArgument::REQUIRED)
            ->addArgument('email', InputArgument::REQUIRED)
            ->addArgument('username', InputArgument::REQUIRED)
            ->addArgument('password', InputArgument::REQUIRED)
            ->addOption('roles', null, InputOption::VALUE_OPTIONAL|InputOption::VALUE_IS_ARRAY)
        ;
    }

    public function initialize(InputInterface $input, OutputInterface $output): void
    {
        $helper = $this->getHelper('question');

        if (!$input->getArgument('firstname')) {
            $question = new Question('Firstname : ');

            $input->setArgument('firstname', $helper->ask($input, $output, $question));
        }

        if (!$input->getArgument('lastname')) {
            $question = new Question('Lastname : ');

            $input->setArgument('lastname', $helper->ask($input, $output, $question));
        }

        if (!$input->getArgument('email')) {
            $question = new Question('Email : ');

            $input->setArgument('email', $helper->ask($input, $output, $question));
        }

        if (!$input->getArgument('username')) {
            $question = new Question('Username : ');

            $input->setArgument('username', $helper->ask($input, $output, $question));
        }

        if (!$input->getArgument('password')) {
            $question = new Question('Password : ');
            $question->setHidden(true);
            $question->setHiddenFallback(false);

            $input->setArgument('password', $helper->ask($input, $output, $question));
        }

        if (!$input->getOption('roles')) {
            $question = new ChoiceQuestion(
                'Roles : ',
                ['ROLE_ADMIN', 'ROLE_USER'],
                'ROLE_USER'
            );
            $question->setMultiselect(true);

            $input->setOption('roles', $helper->ask($input, $output, $question));
        }
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $user = new User();
        $user->setFirstname($input->getArgument('firstname'));
        $user->setLastname($input->getArgument('lastname'));
        $user->setEmail($input->getArgument('email'));
        $user->setUsername($input->getArgument('username'));
        $user->setPassword(
            $this->hasher->hashPassword($user, $input->getArgument('password'))
        );
        $user->setRoles($input->getOption('roles') ?? []);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        $io->success('The user has been created. You can now use your credentials to connect to the application.');

        return Command::SUCCESS;
    }
}
