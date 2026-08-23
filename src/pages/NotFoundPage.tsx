import { Link } from "react-router";
import { Button } from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md text-center">
        <p className="text-8xl font-bold tracking-tight text-blue-600">404</p>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Page not found
        </h1>

        <p className="mt-3 text-slate-600">
          Sorry, we couldn’t find the page you’re looking for. It may have been
          moved or the URL might be incorrect.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/"
            className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium
                       text-white transition hover:bg-blue-700
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       focus:ring-offset-2"
          >
            Go Home
          </Link>

          <Button type="button" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
