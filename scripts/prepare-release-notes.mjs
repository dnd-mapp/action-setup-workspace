import { writeFile } from 'fs/promises';
import { join } from 'path';
import { extractReleaseNotesSection, readChangelog, releasedVersion } from './changelog.mjs';

/**
 * Writes `notes` to `.github/release-notes.md`, overwriting any existing file at that path.
 *
 * @param {string} notes - The release notes content to write, as produced by
 *   {@link extractReleaseNotesSection}.
 * @returns {Promise<void>} Resolves once the file has been written.
 * @throws {Error} If `.github/` does not exist or the file cannot be written.
 */
async function writeReleaseNotes(notes) {
    const releaseNotesPath = join(process.cwd(), '.github/release-notes.md');

    await writeFile(releaseNotesPath, notes, { encoding: 'utf8' });
}

/**
 * Entry point that prepares the release notes for the version being published.
 *
 * Intended to run in CI when a release tag is pushed, with `RELEASED_VERSION` set to that
 * tag, so the resulting `.github/release-notes.md` can be used as the body of the
 * corresponding GitHub release and its mirroring Announcements discussion.
 *
 * @returns {Promise<void>} Resolves once the release notes file has been written.
 * @throws {Error} Propagates any error from the individual steps; the caller (see the bottom
 *   of this file) catches it, logs it, and exits the process with a non-zero code.
 */
async function prepareReleaseNotes() {
    const version = releasedVersion();
    const changelog = await readChangelog();
    const releaseNotes = extractReleaseNotesSection(changelog, version);

    await writeReleaseNotes(releaseNotes);
}

prepareReleaseNotes()
    .then(() => console.log('Release notes prepared successfully.'))
    .catch((error) => {
        console.error(`::error::${error.message}`);
        process.exit(1);
    });
