import { readFile } from 'fs/promises';
import { join } from 'path';

/**
 * Reads the repository's `CHANGELOG.md` in full.
 *
 * @returns {Promise<string>} The raw contents of `CHANGELOG.md`, encoded as UTF-8.
 * @throws {Error} If `CHANGELOG.md` does not exist at the repository root or cannot be read.
 */
export async function readChangelog() {
    const changelogPath = join(process.cwd(), 'CHANGELOG.md');

    return await readFile(changelogPath, { encoding: 'utf8' });
}

/**
 * Escapes regular expression metacharacters in `value`, so it can be safely interpolated
 * into a `RegExp` pattern and matched literally.
 *
 * Needed because a version string may contain characters that are meaningful in a regex
 * (e.g. `.` in `1.2.3`).
 *
 * @param {string} value - The literal string to escape.
 * @returns {string} `value` with every regex metacharacter prefixed by a backslash.
 */
function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Extracts the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)-formatted section
 * for `version`, including its `## [x.x.x] - YYYY-MM-DD` heading line.
 *
 * The section is bounded by the matching `## [x.x.x] ...` heading and the next `## [...]`
 * heading that follows it (typically the previous release), or the end of the file if there
 * is none.
 *
 * @param {string} changelog - The full contents of `CHANGELOG.md`, as returned by
 *   {@link readChangelog}.
 * @param {string} version - The released version to look up, without a leading `v` (e.g.
 *   `1.2.3`).
 * @returns {string} The matched section, trimmed of surrounding whitespace and terminated
 *   with a single trailing newline.
 * @throws {Error} If no `## [<version>]` heading for `version` exists in `changelog`.
 */
export function extractReleaseNotesSection(changelog, version) {
    const headingPattern = new RegExp(`^## \\[${escapeRegExp(version)}\\].*$`, 'm');
    const headingMatch = headingPattern.exec(changelog);

    if (!headingMatch) {
        throw new Error(`Could not find a changelog section for version "${version}".`);
    }
    const sectionStart = headingMatch.index;
    const contentStart = sectionStart + headingMatch[0].length;
    const nextHeadingMatch = /^## \[.*$/m.exec(changelog.slice(contentStart));
    const sectionEnd = nextHeadingMatch ? contentStart + nextHeadingMatch.index : changelog.length;

    return changelog.slice(sectionStart, sectionEnd).trim() + '\n';
}

/**
 * Reads the `RELEASED_VERSION` environment variable and strips its leading `v`, so it can be
 * matched against a `CHANGELOG.md` heading (e.g. `v1.2.3` -> `1.2.3`).
 *
 * @returns {string} The released version, without a leading `v`.
 * @throws {Error} If `RELEASED_VERSION` is unset or empty.
 */
export function releasedVersion() {
    const releasedVersion = process.env['RELEASED_VERSION'];

    if (!releasedVersion) {
        throw new Error('The `RELEASED_VERSION` environment variable is not set.');
    }
    return releasedVersion.replace(/^v/, '');
}
