<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Controller\CreateQuizController;
use App\Repository\QuizRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: QuizRepository::class)]
#[ApiResource(
    collectionOperations: [
        "get" => ["security" => "is_granted('ROLE_USER')"],
        "post" => [
            'controller' => CreateQuizController::class,
            "security_post_denormalize" => "is_granted('ROLE_ADMIN')"
        ],
    ],
    itemOperations: [
        "get" => ["security" => "is_granted('ROLE_USER')"],
        "put" => ["security" => "is_granted('ROLE_ADMIN')" ],
        "patch" => ["security" => "is_granted('ROLE_ADMIN')" ],
        "delete" => ["security" => "is_granted('ROLE_ADMIN')" ],
    ],
    denormalizationContext: ['groups' => ['write:quiz']],
)]
class Quiz
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private int $id;

    #[Groups("write:quiz")]
    #[ORM\Column(type: 'string', length: 255)]
    #[Assert\NotNull]
    #[Assert\NotBlank]
    private string $title;

    #[Groups("write:quiz")]
    #[ORM\Column(type: 'text')]
    #[Assert\NotNull]
    #[Assert\NotBlank]
    private string $description;

    #[ORM\Column(type: 'string', length: 255, unique: true)]
    #[Gedmo\Slug(fields: ['title'])]
    private string $slug;

    #[Gedmo\Timestampable(on: 'create')]
    #[ORM\Column(type: 'datetime_immutable')]
    #[Assert\GreaterThanOrEqual('today')]
    private \DateTimeImmutable $createdAt;

    /**
     * @var Collection<int, Tag>
     */
    #[Groups("write:quiz")]
    #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'quizzes')]
    #[ORM\JoinColumn(nullable: true)]
    private Collection $tags;

    #[Groups("write:quiz")]
    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: 'quizzes')]
    #[ORM\JoinColumn(nullable: false)]
    private Category $category;

    /**
     * @var Collection<int, Question>
     */
    #[ORM\OneToMany(mappedBy: 'quiz', targetEntity: Question::class, orphanRemoval: true)]
    private Collection $questions;

    /**
     * @var Collection<int, Involvement>
     */
    #[ORM\OneToMany(mappedBy: 'quiz', targetEntity: Involvement::class, orphanRemoval: true)]
    private Collection $involvements;

    /**
     * @var Collection<int, Answer>
     */
    #[ORM\OneToMany(mappedBy: 'quiz', targetEntity: Answer::class, orphanRemoval: true)]
    private Collection $answers;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'createdQuizzes')]
    #[ORM\JoinColumn(nullable: false)]
    private User $createdBy;

    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->questions = new ArrayCollection();
        $this->involvements = new ArrayCollection();
        $this->answers = new ArrayCollection();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getSlug(): string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): self
    {
        $this->slug = $slug;

        return $this;
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

    /**
     * @return Collection<int, Tag>
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): self
    {
        if (!$this->tags->contains($tag)) {
            $this->tags[] = $tag;
        }

        return $this;
    }

    public function removeTag(Tag $tag): self
    {
        $this->tags->removeElement($tag);

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): self
    {
        $this->category = $category;

        return $this;
    }

    /**
     * @return Collection<int, Question>
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): self
    {
        if (!$this->questions->contains($question)) {
            $this->questions[] = $question;
            $question->setQuiz($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): self
    {
        if ($this->questions->removeElement($question)) {
            // set the owning side to null (unless already changed)
            if ($question->getQuiz() === $this) {
                $question->setQuiz(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Involvement>
     */
    public function getInvolvements(): Collection
    {
        return $this->involvements;
    }

    public function addInvolvement(Involvement $involvement): self
    {
        if (!$this->involvements->contains($involvement)) {
            $this->involvements[] = $involvement;
            $involvement->setQuiz($this);
        }

        return $this;
    }

    public function removeInvolvement(Involvement $involvement): self
    {
        if ($this->involvements->removeElement($involvement)) {
            // set the owning side to null (unless already changed)
            if ($involvement->getQuiz() === $this) {
                $involvement->setQuiz(null);
            }
        }

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
            $answer->setQuiz($this);
        }

        return $this;
    }

    public function removeAnswer(Answer $answer): self
    {
        if ($this->answers->removeElement($answer)) {
            // set the owning side to null (unless already changed)
            if ($answer->getQuiz() === $this) {
                $answer->setQuiz(null);
            }
        }

        return $this;
    }

    public function getCreatedBy(): ?User
    {
        return $this->createdBy;
    }

    public function setCreatedBy(?User $createdBy): self
    {
        $this->createdBy = $createdBy;

        return $this;
    }
}
