<template>
  <b-tabs card>
    <b-tab active>
      <template slot="title">
        <icon class="upload-image-icon"
              name="images"></icon>
        <strong> {{ $t('modal.pick_link') }}</strong>
      </template>
      <div class="form-group">
        <label>{{ $t('settings.url') }}</label>
        <b-form-input type="text"
                      v-model="pickLink"
                      @input="updatePreData"
                      :placeholder="$t('insert_link')">
        </b-form-input>
      </div>
      <div class="form-group">
        <label>{{ $t('settings.page_sections') }}</label>
        <b-form-select 
          @change="updatePreData"
          v-model="pickLink" 
          class="mb-3">
          <option v-for="widget in currentWidgetList"
                  :value="`#${widget.uniqeId}`">{{ widget.uniqeId }}</option> 
        </b-form-select>
      </div>
    </b-tab>
  </b-tabs>
</template>

<script>
import { EventBus } from '../../events/event-bus'

export default {
  name: 'LinkPickerModal',
  data () {
    return {
      pickLink: null
    }
  },
  mounted () {
    this.pickLink = this.value
  },
  props: {
    value: {
      type: [Object, Boolean, Array, String],
      required: false
    }
  },
  methods: {
    updatePreData () {
      this.$emit('input', this.pickLink)
    }
  },
  computed: {
    currentWidgetList () {
        return this.$store.state.main.currentWidgetList
    }
  }
}
</script>
