<template>
<nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="#">
            <img src="../assets/cdnlogo.com_university-of-toronto.svg" alt="Logo" />
            <img src="../assets/University_of_California_San_Francisco_logo.svg" alt="Logo" />
            <img src="../assets/M_2out-mar-gold.png" alt="Logo" />
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="burgerActive = !burgerActive">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': burgerActive }">
        <div class="navbar-end">
            <a class="navbar-item" href="#"> Data </a>

            <a class="navbar-item" href="#"> Github </a>

            <a class="navbar-item" href="#"> Tmp </a>
        </div>
    </div>
</nav>
</template>

<script>
export default {
    data() {
        return {
            burgerActive: false,
        };
    },
};
</script>
