<template>
<div class="full-page">
  <div class="container-full">
    <div class="row clear">
      <div class=
      "col-12 col-lg-6 push-lg-3 flex-center text-center pad-bottom-10">
      <h1>Signup</h1>
      </div>
    </div>
    <div class="row clear">
      <div class="col-12 col-lg-12 flex-center text-center">
      <form id="signup">
      <input placeholder="User Name" type="text" v-model="name"><br>
      <input placeholder="Email Address" type="email" v-model="email"><br>
      <input placeholder="Password" type="password" v-model="password"><br>
      <input placeholder="Confirm Password" type="password" v-model="confirm_password"><br>
      <button :disabled="isInvalid">Signup</button>
      </form>

      </div>
    </div>
  </div>
</div>
</template>
<script>
module.exports = {
  data : function () {
    return {
        name : "",
        email : "",
        password: "",
        confirm_password: ""

    };
  },
  computed : {
    isInvalid : function () {
      return !(this.name.length > 0 && this.email.length > 0 && this.password == this.confirm_password && this.password.length > 0);
    }
  }
};
</script>
