<template>
  <div>
  </div>
</template>

<script setup lang="ts">

import { SweepEditorUI } from "./SweepEditorUI";
SweepEditorUI.get();

// 禁止右键菜单
document.addEventListener('contextmenu',(e)=>{
	e.preventDefault();
})
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

canvas {
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
}
</style>
