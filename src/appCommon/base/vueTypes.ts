import {LocationAsRelativeRaw, RouteLocationOptions, RouteQueryAndHash} from "vue-router";

const forWebpackReloadingTypescript = "";

export {
  watch, reactive, computed, toRef, toRefs,
  ref, defineComponent, defineAsyncComponent,
  defineProps, onMounted, nextTick, watchEffect
} from "vue";


export type {
  UnwrapRef, PropType, Prop , ComponentPropsOptions,
  Ref, ComputedRef, ToRefs, ReactiveEffect,
} from "vue";


export type {
  RouteLocation, Router, RouterOptions,
  RouteRecord, RouteComponent, RouteMeta, RouteParams,
} from "vue-router"

export type RouteLocationObject = (RouteQueryAndHash & LocationAsRelativeRaw & RouteLocationOptions);

export type AtLeastOne<T, U = {[K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
