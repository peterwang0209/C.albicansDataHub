<template>
  <div
    class="w-full max-w-7xl mx-auto mt-10 p-6 bg-white rounded-md flex justify-between"
  >
    <!-- Feedback Type Selection -->
    <div class="flex-row w-1/2">
      <div class="flex flex-col justify-center">
        <div class="flex items-center mb-4">
          <input
            type="radio"
            id="bug"
            value="Bug"
            v-model="selectedType"
            class="mr-2"
          />
          <label for="bug" class="text-sm font-medium text-gray-700"
            >Bug - Please report a problem that prevents the website from
            functioning correctly, such as an action resulting in no output or
            incorrect output. Your detailed description helps us identify and
            fix issues promptly.</label
          >
        </div>
        <div class="flex items-center mb-4">
          <input
            type="radio"
            id="request"
            value="Request"
            v-model="selectedType"
            class="mr-2"
          />
          <label for="request" class="text-sm font-medium text-gray-700"
            >Request - Do you have a feature in mind that would enhance your
            experience on our website? Let us know what functionality you're
            looking for, and we'll consider it for future updates!</label
          >
        </div>
        <div class="flex items-center mb-4">
          <input
            type="radio"
            id="suggestion"
            value="Suggestion"
            v-model="selectedType"
            class="mr-2"
          />
          <label for="suggestion" class="text-sm font-medium text-gray-700"
            >Suggestion- We value your overall impression of our website. Share
            your thoughts on the aesthetics, such as color schemes or design
            elements, and any suggestions you have for making the site more
            user-friendly and enjoyable.</label
          >
        </div>
      </div>
      <!-- Feedback Content Input -->
      <div class="flex-grow">
        <textarea
          id="user-feedback"
          v-model="userFeedback"
          class="w-full bg-white border border-gray-300 rounded-md"
          rows="5"
          placeholder="Type your feedback here..."
        ></textarea>
        <button
          type="submit"
          @click="submitFeedback"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>

    <!-- Feedback List Display -->
    <div class="w-2/5">
      <h2 class="text-xl font-semibold mb-4">Feedback List:</h2>
      <ul>
        <li
          v-for="feedback in feedbackList"
          :key="feedback.id"
          class="mb-2 border-b pb-2"
        >
          {{ feedback.category }} - {{ feedback.content }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      selectedType: "Bug",
      userFeedback: "",
      feedbackList: [],
    };
  },
  async created() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/feedback`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      this.feedbackList = data;
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  },
  methods: {
    async submitFeedback() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/feedback`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              content: this.userFeedback,
              category: this.selectedType,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        this.feedbackList = data;

        this.userFeedback = ""; // Clear input
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    },
  },
};
</script>
