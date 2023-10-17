# System Design Document

---

## Project Overview

The primary objective of this project is to build a robust full-stack web application to promote the collaborative efforts among the lab members of UCSF, UoT, and UMN on the Candida Albican experiment. This application is solely intended for internal lab members, with an estimated audience of approximately 60 users. No integration with pre-existing code will be required.

## Data Management

The application will handle four different file formats: CSV, TSV, Excel, and JPEG, with a data count of around 12,400 entries and 35 JPEG images, each of approximately 500KB size. However, since all data insertions are backend-handled, there are minimal considerations for bandwidth as users won't add new entries.

## System Architecture

The proposed system will utilize the following technologies and will be hosted on a dedicated server provided by the school:

### Front End

- Vue: This JavaScript framework offers scalability, flexibility, and high-performance, making it a more attractive alternative to traditional HTML.
- TailwindCSS: An intuitive, utility-first CSS library that allows developers to see their changes in real time as they code.

### Back End

- Express: This Node.js web application framework offers robust features, facilitating full-stack web application development.
- Sqlite3: Considering our data's structured nature, we opt for a lightweight, yet efficient relational database system.

### API Endpoints

- `/`: Home
- `/alldata`: Displays all data in the database
- `/research`: Showcases research papers
- `/About`: Features information about research members
- `/datapage/{id}`: Displays data based on a unique ID

## System Performance & Characteristics

As the system is not expected to serve more than 100 concurrent users, high concurrency is not a significant concern. Since the application is read-focused and users can't perform write operations, there's minimal traffic load, eliminating the need for load balancing, scaling, and asynchronous processing considerations. However, to enhance system performance, caching can be beneficial. Data partitioning considerations are also minimized due to the lightweight nature of our data.

## Indexing Strategy

Users primarily use the `feature_name` for search operations, making it the ideal candidate for a `clustered index`. Additionally, `ORF_ID` and `Common` can also serve as search parameters, hence they are designated as `unclustered indexes`.

## Potential Bottlenecks & Mitigation Strategies

Deployment on a UMN machine, backed up by a secondary server, provides robustness against potential server issues. Given that database operations involve physical files, the risk of data loss is mitigated, rendering data replication unnecessary.

## User Interface & Experience Design

To cater to our niche audience, the user interface and experience design will be centered around providing a streamlined and intuitive user experience. It's crucial to ensure easy navigation and data access, keeping the learning curve to a minimum.

## System Monitoring & Logging

While comprehensive system monitoring is not a necessity, implementing logging mechanisms will provide valuable insights into system performance and potential issues.

## Code Management & Testing

The codebase for this project will be stored on GitHub. Continuous deployment is not currently considered, and due to the project's small scale and controlled user base, formal testing is not planned.
