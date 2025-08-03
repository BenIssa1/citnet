import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


interface CarouselSlide {
  id: number;
  image: string;
  author: string;
  date: string;
  title: string;
  description: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    image: '/images/carousel.jpg',
    author: "Phoenix Baker",
    date: "19 Jan 2022",
    title: "Migrating to Linear",
    description: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
  },
  {
    id: 2,
    image: '/images/carousel.jpg',
    author: "Phoenix Baker",
    date: "19 Jan 2022",
    title: "Building Mobile Apps",
    description: "Discover modern mobile development techniques and best practices for creating engaging user experiences.",
  },
  {
    id: 3,
    image: '/images/carousel.jpg',
    author: "Phoenix Baker",
    date: "19 Jan 2022",
    title: "Design Systems",
    description: "Learn how to create and maintain scalable design systems for consistent user interfaces.",
  },
  {
    id: 4,
    image: '/images/carousel.jpg',
    author: "Phoenix Baker",
    date: "19 Jan 2022",
    title: "Video Production",
    description: "Professional video production techniques for marketing content and brand storytelling.",
  },
  {
    id: 5,
    image: '/images/carousel.jpg',
    author: "Phoenix Baker",
    date: "19 Jan 2022",
    title: "User Experience",
    description: "Creating intuitive user experiences that convert visitors into customers.",
  },
  {
    id: 6,
    image: '/images/carousel.jpg',
    author: "Phoenix Baker",
    date: "19 Jan 2022",
    title: "Digital Strategy",
    description: "Comprehensive digital marketing strategies for modern businesses.",
  },
];

export function MarketingCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const goToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div className=" bg-[#FEEEC5]">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <h1 className="text-3xl font-bold text-foreground">Marketing Digital</h1>
          <Button
            variant="outline"
            className="text-primary hover:bg-primary hover:text-primary-foreground px-6 py-2 rounded-lg border-[#F338A3] border-2"
          >
            ↗ Voir plus
          </Button>
        </div>

        {/* Carousel */}
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden border-3 border-black bg-card hover:shadow-lg transition-shadow duration-300 py-0 rounded-none ">
                  <div className="aspect-[5/3] overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <span className="font-medium">{slide.author}</span>
                      <span>•</span>
                      <span>{slide.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#0B0063] mb-3 line-clamp-2">
                      {slide.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">
                      {slide.description}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                current === index + 1
                  ? "bg-primary scale-110"
                  : "bg-[#423e32] hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}