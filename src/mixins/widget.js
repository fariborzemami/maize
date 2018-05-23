import TextEditable from '@/components/editable-parts/Text.vue'
import ImageEditable from '@/components/editable-parts/Image.vue'
import VideoEditable from '@/components/editable-parts/Video.vue'
import BgEditable from '@/components/editable-parts/Bg.vue'
import WidgetToolbox from '../components/partial/WidgetToolbox'


const Mixin = {
  components: {TextEditable, ImageEditable, BgEditable, WidgetToolbox, VideoEditable},
  name: 'EventBody',
  data() {
    return {
      editMode: false,
      fullWidth: false
    }
  },
  mounted() {
    this.data = this._.extend(this.data, this.widgetData)
  },
  computed: {
    previewMode() {
      return this.$store.state.main.previewMode
    }
  },
  watch: {
    previewMode() {
      if (this.previewMode) {
        this.editMode = false
      }
    },
    widgetData() {
      this.data = this._.extend(this.data, this.widgetData)
    }
  },
  props: {
    // TODO: merge widget data expect default pattern
    widgetData: {
      default() {
        return {}
      },
      require: false
    },
    uniqeKey: {
      default: null,
      require: true
    }
  },
  methods: {
    moveUp() {
      this.$store.dispatch('main/moveWidget', {
        direction: 'up',
        key: this.uniqeKey
      })
    },
    moveDown() {
      this.$store.dispatch('main/moveWidget', {
        direction: 'down',
        key: this.uniqeKey
      })
    },
    updateData(e = {name: null, data: null}) {
      this.$store.dispatch('main/updateItemOfCurrentWidgetList', {
        key: this.uniqeKey, // id of this widget in cuurentWidgetList
        name: e.name, // name of editble part that his data must be update
        data: e.data
      })
    },
    toggleFullWidth() {
      this.data.config.fullWidth = !this.data.config.fullWidth
      this.updateData({
        name: 'config',
        data: {
          fullWidth: this.data.config.fullWidth
        }
      })
    },
    deleteWidget() {
      this.$store.dispatch('main/removeFromCurrentWidgetList', this.uniqeKey)
    },
    toggleEditMode() {
      this.editMode = !this.editMode
    },
    imageUpload(e) {
      console.log('imageUpload')
      const $img = $(e.target).next('img')
      if (e.target.files && e.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $img.attr('src', e.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  }
}

export default Mixin
