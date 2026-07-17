import { extractReleaseNotesSection, readChangelog, releasedVersion } from './changelog.mjs';

/**
 * Verifies that `CHANGELOG.md` has a section matching the `RELEASED_VERSION` environment
 * variable.
 *
 * Intended to run in CI's `validate` job when a release tag is pushed, so a missing or
 * misnamed changelog section fails fast with a clear message instead of surfacing later as
 * an empty-content error when `prepare-release-notes.mjs` tries to extract it.
 *
 * @returns {Promise<void>} Resolves once the check passes.
 * @throws {Error} Propagates any error from reading the changelog or finding the section; the
 *   caller (see the bottom of this file) catches it, logs it, and exits the process with a
 *   non-zero code.
 */
async function checkChangelogSection() {
    const version = releasedVersion();
    const changelog = await readChangelog();

    extractReleaseNotesSection(changelog, version);
}

checkChangelogSection()
    .then(() => console.log('Changelog section found.'))
    .catch((error) => {
        console.error(`::error::${error.message}`);
        process.exit(1);
    });
