export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-5xl font-bold tracking-tight text-black dark:text-zinc-50">
            SCOOP
          </h1>
          <p className="text-2xl font-medium text-zinc-700 dark:text-zinc-300">
            See it. Scoop it.
          </p>
          <p className="max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400 mt-4">
            Scoop lets you identify and find products seen in video. Spot
            something you like? Scoop it instantly.
          </p>
        </div>
      </main>

      <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 py-8 px-16">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center max-w-2xl mx-auto">
          The term &apos;Etsy&apos; is a trademark of Etsy, Inc. This application
          uses the Etsy API but is not endorsed or certified by Etsy, Inc.
        </p>
      </footer>
    </div>
  );
}
