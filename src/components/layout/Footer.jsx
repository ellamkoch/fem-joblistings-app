/**
 * Application footer with a short attribution.
 */
export default function Footer() {
  return (
    <footer className="app-footer mx-auto w-full max-w-lg px-6 pb-10 pt-8 text-center text-xs text-muted-foreground">
      <p>
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-foreground"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="#" className="underline hover:text-foreground">
          Ella Koch
        </a>
        .
      </p>
    </footer>
  );
}
