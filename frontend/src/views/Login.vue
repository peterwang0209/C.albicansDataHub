<template>
  <div class="main-container">
    <section class="hero">
      <div class="hero-body">
        <p class="title">C.Alicans DataHub</p>
        <p class="subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          vulputate tellus dapibus nisl tincidunt pulvinar. Morbi congue
          porttitor dolor, in iaculis turpis dictum nec. In quis nunc odio.
          Vestibulum ut nisl ac ante molestie vehicula eget a est. Vivamus porta
          ex sit amet metus hendrerit mollis. Ut in enim dictum, maximus arcu
          quis, tempus tellus. Suspendisse vehicula hendrerit interdum. Morbi
          fringilla sodales quam in convallis. Morbi scelerisque nec dui sit
          amet dignissim. Proin ac maximus ex, ac mollis metus. Donec elementum
          ullamcorper placerat. Nullam facilisis convallis enim accumsan
          consectetur. Phasellus vel turpis ut lorem feugiat feugiat et eu sem.
        </p>
      </div>
    </section>

    <div class="is-flex is-justify-content-center">
      <div class="field is-horizontal">
        <p class="control has-icons-left">
          <input class="input" type="password" placeholder="Open Sesame!" />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
        <button class="button">Open</button>
      </div>
    </div>

    <div class="centered-text title">
      <p>Powered By</p>
    </div>
    <div class="container">
      <div class="flex-container">
        <div class="item2">
          <img src="../assets/Utoronto_coa.svg" alt="logo" />
        </div>
        <div class="item3">
          <img src="../assets/UCSF.svg" alt="" />
        </div>
        <div class="item4">
          <img src="../assets/UMN.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.main-container {
    height: 100%;
}

.centered-text {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.field {
  position: relative;
  width: vw;
}

.input .button {
  height: 20px;
}

.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 20px 0;
}

.flex-container > div {
  text-align: center;
  flex: 1;
  padding: 20px;
}

.flex-container > div img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>

<script lang="ts">
</script>
