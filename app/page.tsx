import { SiteShell } from "@/components/site/SiteShell";

export default function HomePage() {
  return (
    <SiteShell>
      <div className="container-rl py-24 md:py-32">
        <h1 className="text-2xl font-semibold md:text-4xl">Engineering begins with understanding</h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Every project starts with curiosity. 
          I investigate complex software systems to understand why they behave the way they do, challenge assumptions until the root cause becomes clear, and build reliable solutions that last. 
          This portfolio is where I document that journey through engineering projects, technical investigations, and research. 
          Whether you're a fellow engineer, a potential collaborator, a client, or simply curious about how complex systems work, I hope you'll find something here that helps you see them a little more clearly.
        </p>
      </div>
    </SiteShell>
  );
}

