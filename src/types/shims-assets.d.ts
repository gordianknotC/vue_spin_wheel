declare module '*.svg' {
  import Vue, { VueConstructor } from 'vue';
  const content: VueConstructor<Vue>;
  export default content;
}

declare module '*.png' {
  const value: any;
  export default value;
}
