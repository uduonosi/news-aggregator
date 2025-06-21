Link to the deployed application: [https://news-aggregator-c5258pwtr-us-projects-70ccb24b.vercel.app/](https://news-aggregator-c5258pwtr-us-projects-70ccb24b.vercel.app/)
Post fetching does not work in the above link because `newsapi.org` does not allow requests from browser in the free developer plan.

Link to the test coverage report: [https://na-test-report.vercel.app/](https://na-test-report.vercel.app/)

## Self-assessment

**Code quality and organization:**
The codebase is modular, readable, and well-structured. Components are separated by responsibility, and logic is encapsulated for maintainability. ESLint and consistent formatting are enforced throughout.

**Performance optimizations and their impact:**
Optimizations include Next.js image handling, SWC for builds, minimal re-renders, and client-side bookmarks. These choices result in fast load times, responsive UI, and efficient resource usage.

**UI/UX design and attention to detail:**
The UI is clean, modern, and fully responsive. Dark mode, error handling, and mobile-friendly layouts ensure a polished user experience. All interactive elements provide instant feedback.

**Test coverage and quality:**
Jest and React Testing Library are used for robust unit and integration tests. Coverage includes all major components and features, with mocks for browser APIs to ensure reliability.

**Proper implementation of required features:**
All required features—dark mode, error handling, bookmarks, responsive header, search, and secure API key usage—are implemented and tested. Edge cases and error states are handled gracefully.

**Bonus points for additional features or exceptional optimizations:**
The project includes a fully functional dark mode and a feature to bookmark articles. This state is also persisted through localStorage. The codebase is ready for further enhancements and scaling.
