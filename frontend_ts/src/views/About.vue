<template>
  <div class="flex flex-col items-center">
    <div class="w-4/5 mt-4">
      <p class="font-semibold text-4xl pl-2">Overview</p>
      <p class="pl-2">
        In pellentesque, justo non tempor lobortis, diam nibh auctor tellus, eu
        porta magna libero sed tortor. Aenean vestibulum, ex sit amet pharetra
        dignissim, ligula risus porttitor nisi, sit amet aliquam velit dolor sit
        amet augue. Donec nec enim nec dolor rhoncus cursus a a dui. Nullam
        convallis efficitur velit vitae mattis. Maecenas elit augue, dignissim
        sit amet sem laoreet, laoreet dapibus purus. Vestibulum ut tortor nec
        metus dignissim dignissim eu a metus. Nunc eros lacus, faucibus nec
        iaculis sodales, sodales eu massa. Aliquam ultricies massa vel commodo
        ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et
        ultrices posuere cubilia curae; Maecenas dignissim magna in risus
        pulvinar sagittis. Aenean est felis, lacinia nec mauris aliquam, mollis
        pulvinar ligula. Etiam vestibulum fermentum quam, vehicula eleifend
        felis dictum ut. Pellentesque habitant morbi tristique senectus et netus
        et malesuada fames ac turpis egestas. Curabitur ut facilisis neque.
        Etiam a diam pellentesque, placerat ex ut, efficitur est. Mauris
        condimentum maximus nisi, eu aliquam tortor mollis at. Nunc massa dolor,
        blandit quis vestibulum nec, aliquam et ipsum. Fusce id nulla et sapien
        congue laoreet. Nam vitae congue leo. Etiam finibus quis erat eget
        ultrices. In finibus mollis lorem sit amet mattis. Curabitur sapien
        turpis, aliquam ac urna eget, pulvinar venenatis elit. Ut molestie risus
        sit amet ante imperdiet finibus.
      </p>
    </div>
    <hr class="w-4/5 my-4" />
    <div class="w-4/5 mt-4">
      <p class="font-semibold text-2xl pl-2">Members</p>
      <div class="flex flex-wrap justify-center">
        <div
          class="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 p-2 border rounded shadow bg-white m-2"
          v-for="member in members"
          :key="member.name"
        >
          <img :src="member.photo" class="w-full h-32 object-cover rounded" />
          <p class="mt-2 font-semibold">{{ member.name }}</p>
          <p>{{ member.school }}</p>
          <p>{{ member.role }}</p>
          <a :href="`mailto:${member.email}`" class="text-blue-500">{{
            member.email
          }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      members: this.generateMembers(15),
    };
  },
  methods: {
    generateMembers(count) {
      let members = [];
      for (let i = 0; i < count; i++) {
        members.push({
          photo: `https://xsgames.co/randomusers/avatar.php?g=pixel&unique=${i}`,
          name: `Member ${i + 1}`,
          school: `School ${i + 1}`,
          role: `Role ${i + 1}`,
          email: `email${i + 1}@example.com`,
        });
      }
      return members;
    },
  },
};
</script>

<style scoped>
</style>
