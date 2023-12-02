<template>
  <div>
    <div class="bg-gray-100 p-8 text-center">
      <h1 class="text-3xl font-bold mb-4">Development Log</h1>
      <p class="text-lg">
        <strong>V1.0:</strong> The number before the period indicates the data
        version. The number after the period represents functionality
        updates.<br />
        <strong>Example:</strong><br />
        V1.1 - Data unchanged, but one update to functionality.<br />
        V2.0 - Database update with new data, functionality update reset to 0.
      </p>
    </div>
    <div class="p-8">
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-2">- Version 1.1 -</h2>
        <ul class="list-disc pl-5">
          <li>
            Improved the search functionality. Users can input and search any
            data among Feature_name, ORF_ID, and Commons without specifying the
            type through a dropdown menu.
          </li>
          <li>Updated the Search History Component.</li>
          <li>
            Fixed the issue that images disappear when alternating between
            graceV1 and graceV2.
          </li>
          <li>
            Now if the data does not exist, an EmptyData page will be displayed
            instead of a blank page.
          </li>
        </ul>
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">- Version 1.0 -</h2>
        <ul class="list-disc pl-5">
          <li>Website Launched.</li>
          <li>Search with the dropdown menu.</li>
          <li>All data page</li>
          <li>Feedback page</li>
          <li>About page</li>
          <li>Research Page</li>
          <li>Overview Page</li>
          <li>Home Page</li>
          <li>
            Data Navigation Panel which allow user switch between Summary,
            Fu2021GeneFeature, GraceV1, Gracev2
          </li>
          <li>D3.js frequency Histogram display in Fu2021GeneFeature page</li>
          <li>Highlight selected cell of DOX/NODOX in GraceV1 and GraceV2</li>
        </ul>
      </div>
    </div>
  </div>
</template>