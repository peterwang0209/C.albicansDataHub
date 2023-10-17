<template>
  <div class="w-full max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
    <form @submit.prevent="submitFeedback">
      <div>
        <label
          for="feedback-type"
          class="block text-sm font-medium text-gray-700"
          >Feedback Type:</label
        >
        <select
          id="feedback-type"
          v-model="selectedType"
          class="mt-2 block w-full bg-white border border-gray-300 rounded-md"
        >
          <option value="Bug">Bug</option>
          <option value="Feedback">Feedback</option>
        </select>
      </div>

      <div class="mt-4">
        <label
          for="user-feedback"
          class="block text-sm font-medium text-gray-700"
          >Your Feedback:</label
        >
        <textarea
          id="user-feedback"
          v-model="userFeedback"
          class="mt-2 block w-full bg-white border border-gray-300 rounded-md"
          rows="5"
        ></textarea>
      </div>

      <button
        type="submit"
        class="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
      >
        Submit
      </button>
    </form>
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Feedback List:</h2>
      <ul>
        <li
          v-for="feedback in feedbackList"
          :key="feedback.id"
          class="mb-2 border-b pb-2"
        >
          {{ feedback.content }} - {{ feedback.category }}
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
      const response = await fetch("http://localhost:8804/feedback");
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
        const response = await fetch("http://localhost:8804/feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: this.userFeedback,
            category: this.selectedType,
          }),
        });

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
