<template>
  <div class="editable-map editable-part"
       @mouseenter="mouseInElement"
       @mouseleave="mouseLeaveElement"
       @dblclick="setPickMapMode"
       :class="{
       'editable-active': editMode,
       'under-edit': toolboxVisible}">
    <iframe class="map"
            :class="cssClass"
            :src="touchedData.frameSrc"
            width="100%"
            height="100%"
            frameborder="0"
            style="border:0"
            allowfullscreen></iframe>
    <div
      @click="(e) => e.preventDefault()"
      @dblclick="setPickMapMode"
      class="iframe-overlay"></div>
  </div>
</template>

<script>
import EditablePartMixin from '../../mixins/editablePart'
import { EventBus } from '../../events/event-bus'

export default {
  name: 'MapEditable',
  mixins: [EditablePartMixin],
  methods: {
    setPickMapMode (e) {
      e.preventDefault()
      this.$store.dispatch('layout/setModalView', {
        name: 'map',
        data: this.touchedData
      })
      EventBus.$once('UPDATE_WIDGET_DATA', (widgetData) => {
        if (widgetData) {
          this.touchedData = widgetData
        }
        this.updateWidget()
      })
      return false
    }
  }
}
</script>
