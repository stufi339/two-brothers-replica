import { Star, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  helpful: number;
}

interface DetailedReviewsProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onWriteReview?: () => void;
}

export const DetailedReviews = ({
  reviews,
  averageRating,
  totalReviews,
  onWriteReview,
}: DetailedReviewsProps) => {
  const ratingDistribution = [
    { stars: 5, percentage: 75, count: Math.floor(totalReviews * 0.75) },
    { stars: 4, percentage: 15, count: Math.floor(totalReviews * 0.15) },
    { stars: 3, percentage: 6, count: Math.floor(totalReviews * 0.06) },
    { stars: 2, percentage: 3, count: Math.floor(totalReviews * 0.03) },
    { stars: 1, percentage: 1, count: Math.floor(totalReviews * 0.01) },
  ];

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-end gap-2">
            <span className="text-5xl font-bold">{averageRating}</span>
            <span className="text-muted-foreground mb-2">out of 5</span>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= averageRating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Based on {totalReviews} reviews
          </p>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map(({ stars, percentage, count }) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-sm w-8">{stars}★</span>
              <Progress value={percentage} className="flex-1 h-2" />
              <span className="text-sm text-muted-foreground w-12 text-right">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Filter and Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">Customer Reviews</h3>
          {onWriteReview && (
            <Button onClick={onWriteReview} variant="outline" size="sm">
              Write a Review
            </Button>
          )}
        </div>
        <Select defaultValue="recent">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="helpful">Most Helpful</SelectItem>
            <SelectItem value="highest">Highest Rating</SelectItem>
            <SelectItem value="lowest">Lowest Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-12 px-4 bg-muted/30 rounded-xl border-2 border-dashed border-border">
            <div className="max-w-md mx-auto">
              <div className="text-5xl mb-4">✍️</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No reviews yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to share your experience with this product
              </p>
              {onWriteReview && (
                <Button onClick={onWriteReview} variant="default">
                  Write First Review
                </Button>
              )}
            </div>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{review.name}</span>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed">{review.text}</p>
              <Button variant="ghost" size="sm" className="gap-2">
                <ThumbsUp className="h-4 w-4" />
                Helpful ({review.helpful})
              </Button>
              <Separator />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
