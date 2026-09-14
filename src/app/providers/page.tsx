export default function Providers() {
  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50 mb-8">
          Providers
        </h1>
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Scoop integrates with the following providers to help you find
            products:
          </p>
          <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 mb-8">
            <li>Etsy</li>
          </ul>
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
