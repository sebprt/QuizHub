<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\InvolvementRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: InvolvementRepository::class)]
#[ApiResource]
class Involvement
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotBlank]
    #[Assert\NotNull]
    private string $status;

    #[ORM\Column(type: 'integer')]
    #[Assert\PositiveOrZero]
    #[Assert\NotNull]
    private int $score;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Assert\DateTime]
    #[Assert\GreaterThanOrEqual('today')]
    #[Gedmo\Timestampable(on: 'create')]
    private \DateTimeImmutable $startedAt;

    #[ORM\Column(type: 'datetime_immutable')]
    #[Assert\DateTime]
    #[Assert\GreaterThanOrEqual(propertyPath: 'startedAt')]
    private \DateTimeImmutable $finishedAt;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'involvements')]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\Valid]
    private User $user;

    #[ORM\ManyToOne(targetEntity: Quiz::class, inversedBy: 'involvements')]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\Valid]
    private Quiz $quiz;

    /**
     * @var Collection<int, Answer>
     */
    #[ORM\OneToMany(mappedBy: 'involvement', targetEntity: Answer::class, orphanRemoval: true)]
    #[Assert\Valid]
    private Collection $answers;

    public function __construct()
    {
        $this->answers = new ArrayCollection();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getScore(): int
    {
        return $this->score;
    }

    public function setScore(int $score): self
    {
        $this->score = $score;

        return $this;
    }

    public function getStartedAt(): \DateTimeImmutable
    {
        return $this->startedAt;
    }

    public function setStartedAt(\DateTimeImmutable $startedAt): self
    {
        $this->startedAt = $startedAt;

        return $this;
    }

    public function getFinishedAt(): \DateTimeImmutable
    {
        return $this->finishedAt;
    }

    public function setFinishedAt(\DateTimeImmutable $finishedAt): self
    {
        $this->finishedAt = $finishedAt;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

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

    /**
     * @return Collection<int, Answer>
     */
    public function getAnswers(): Collection
    {
        return $this->answers;
    }

    public function addAnswer(Answer $answer): self
    {
        if (!$this->answers->contains($answer)) {
            $this->answers[] = $answer;
            $answer->setInvolvement($this);
        }

        return $this;
    }

    public function removeAnswer(Answer $answer): self
    {
        if ($this->answers->removeElement($answer)) {
            // set the owning side to null (unless already changed)
            if ($answer->getInvolvement() === $this) {
                $answer->setInvolvement(null);
            }
        }

        return $this;
    }
}
