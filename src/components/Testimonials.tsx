
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";

const testimonials = [
  {
    quote: "BuildVault has completely transformed how we bid on storage unit projects. Our estimates are now consistently accurate and we're winning more contracts.",
    author: "Michael Johnson",
    role: "Owner, Johnson Construction",
    avatar: "MJ",
  },
  {
    quote: "The time savings alone made this worth it. What used to take days now takes hours, and our proposal quality has improved dramatically.",
    author: "Sarah Rodriguez",
    role: "Project Manager, StoragePro Builders",
    avatar: "SR",
  },
  {
    quote: "As a specialized storage unit contractor, having software that understands our specific needs has been a game changer. Highly recommended!",
    author: "David Chen",
    role: "CEO, Chen Storage Solutions",
    avatar: "DC",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-3">What Our Customers Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by storage unit contractors across the country
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white">
              <CardHeader>
                <div className="text-3xl text-primary">"</div>
              </CardHeader>
              <CardContent>
                <p className="italic text-foreground">{testimonial.quote}</p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
