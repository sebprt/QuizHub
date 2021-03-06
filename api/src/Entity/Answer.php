<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AnswerRepository;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: AnswerRepository::class)]
#[ApiResource(
    collectionOperations: [
        "get" => ["security" => "is_granted('ROLE_ADMIN')"],
        "post" => ["security_post_denormalize" => "is_granted('ROLE_USER')"],
    ],
    itemOperations: [
        "get" => ["security" => "is_granted('ROLE_ADMIN') or object.owner == user"],
    ],
)]
class Answer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Assert\GreaterThanOrEqual('today')]
    #[Gedmo\Timestampable(on: 'create')]
    private \DateTimeImmutable $createdAt;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Assert\GreaterThanOrEqual(propertyPath: 'createdAt')]
    #[Gedmo\Timestampable(on: 'update')]
    private \DateTimeImmutable $updatedAt;

    #[ORM\ManyToOne(targetEntity: Involvement::class, inversedBy: 'answers')]
    #[ORM\JoinColumn(nullable: false)]
    private Involvement $involvement;

    #[ORM\ManyToOne(targetEntity: Quiz::class, inversedBy: 'answers')]
    #[ORM\JoinColumn]
    private Quiz $quiz;

    #[ORM\ManyToOne(targetEntity: Choice::class, inversedBy: 'answers')]
    #[ORM\JoinColumn(nullable: false)]
    private Choice $choice;

    public function getId(): int
    {
        return $this->id;
    }

    public function getCreatedAt(): \DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdatedAt(): \DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    public function getInvolvement(): ?Involvement
    {
        return $this->involvement;
    }

    public function setInvolvement(?Involvement $involvement): self
    {
        $this->involvement = $involvement;

        return $this;
    }

    public function getQuiz(): ?Quiz
    {
        return $this->quiz;
    }

    public function setQuiz(?Quiz $quiz): self
    {
        $this->quiz = $quiz;

        return $this;
    }

    public function getChoice(): ?Choice
    {
        return $this->choice;
    }

    public function setChoice(?Choice $choice): self
    {
        $this->choice = $choice;

        return $this;
    }
}
