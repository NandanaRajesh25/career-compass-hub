import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import { GraduationCap, Building2, Users, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const companies = [
  "Google", "Microsoft", "Amazon", "Infosys", "TCS", "Wipro",
  "Adobe", "Flipkart", "Tata Motors", "Deloitte", "Accenture", "HCL",
];

const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-primary" />
            <span className="font-bold text-lg">CGPU</span>
          </Link>
          <div className="flex gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px]" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Empowering Careers Since 2010
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Career Guidance &<br />
              <span className="gradient-text">Placement Unit</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Connecting talented students with top companies. Your gateway to dream placements and successful careers.
            </p>

            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild className="gap-2">
                <Link to="/register">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <StatsCard label="Companies Visited" value={150} suffix="+" icon={Building2} />
            <StatsCard label="Students Placed" value={2500} suffix="+" icon={Users} />
            <StatsCard label="Highest Package" value={45} suffix=" LPA" icon={TrendingUp} />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">About CGPU</h2>
          <p className="text-muted-foreground leading-relaxed">
            The Career Guidance and Placement Unit bridges the gap between academia and industry.
            We facilitate campus recruitment drives, career counseling, and skill development programs
            to ensure every student finds the right career path. Our dedicated team works year-round
            to bring the best opportunities to your doorstep.
          </p>
        </div>
      </section>

      {/* Companies */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">Our Recruiters</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {companies.map((name, i) => (
              <motion.div
                key={name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                className="glass-card rounded-xl p-4 flex items-center justify-center h-20 text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>© 2024 Career Guidance and Placement Unit. All rights reserved.</p>
          <p className="mt-1">National Institute of Technology — Building Futures, One Placement at a Time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
