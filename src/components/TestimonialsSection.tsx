import { testimonials, testimonialStats } from "@/data/testimonials";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "fill-primary text-primary"
              : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
};

export const TestimonialsSection = () => {
  const featuredTestimonial = testimonials[0];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy families enjoying pure, organic goodness
            every day
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {testimonialStats.totalCustomers}
            </div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {testimonialStats.averageRating}★
            </div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {testimonialStats.totalReviews}+
            </div>
            <div className="text-sm text-muted-foreground">Total Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {testimonialStats.satisfactionRate}%
            </div>
            <div className="text-sm text-muted-foreground">Satisfaction</div>
          </div>
        </div>

        {/* Featured Testimonial */}
        <Card className="mb-12 border-2 border-primary/20 bg-accent/20">
          <CardContent className="p-8">
            <Quote className="w-12 h-12 text-primary/30 mb-4" />
            <p className="text-xl md:text-2xl text-foreground mb-6 italic">
              "{featuredTestimonial.text}"
            </p>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-semibold text-foreground">
                    {featuredTestimonial.name}
                  </p>
                  {featuredTestimonial.verified && (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {featuredTestimonial.location}
                </p>
                <p className="text-sm text-muted-foreground">
                  Purchased: {featuredTestimonial.product}
                </p>
              </div>
              <StarRating rating={featuredTestimonial.rating} />
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.slice(1).map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <StarRating rating={testimonial.rating} />
                      {testimonial.verified && (
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <p className="text-foreground mb-4 line-clamp-4">
                      "{testimonial.text}"
                    </p>
                    <div className="border-t border-border pt-4">
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {testimonial.product}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};
