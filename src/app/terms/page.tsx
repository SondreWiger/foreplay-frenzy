import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="min-h-dvh min-h-screen bg-blood-950 text-white">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <Link href="/" className="text-sm text-white/40 hover:text-white/60 transition-colors">
          ← Back to Foreplay Frenzy
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold">Terms of Service</h1>
        <p className="text-xs text-white/30">Last updated: July 2026</p>

        <div className="space-y-6 text-sm text-white/70 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Foreplay Frenzy (&quot;the App&quot;), you agree to be bound by these
              Terms of Service. If you do not agree, do not use the App.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">2. Age Requirement</h2>
            <p>
              You must be at least 18 years of age (or the age of majority in your jurisdiction) to
              use this App. By using the App, you represent and warrant that you meet this requirement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">3. Description of Service</h2>
            <p>
              Foreplay Frenzy is a party and couples game application that provides card-based game
              modes, prompts, and activities. The App is intended for entertainment purposes only.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">4. User Content</h2>
            <p>
              The App allows users to create custom card packs. You are solely responsible for any
              content you create. You agree not to create content that is illegal, harmful, or
              violates the rights of others.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">5. Data Storage</h2>
            <p>
              All user data (game sessions, settings, custom cards) is stored locally on your device
              using browser local storage. We do not collect, transmit, or store any personal data
              on external servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">6. Disclaimer</h2>
            <p>
              The App is provided &quot;as is&quot; without warranties of any kind. We are not responsible
              for any consequences arising from the use of this App. Users are responsible for
              ensuring all participants consent to and are comfortable with any activities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">7. Consent & Safety</h2>
            <p>
              This App includes features related to adult activities. All participants must be
              consenting adults. The App includes a safe word system — always respect it. If anyone
              signals to stop, stop immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the App
              after changes constitutes acceptance of the new terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
