// Styles
import './VCalendarMonthDay.sass'

// Components
import { VCalendarEvent } from './VCalendarEvent'
import { VBtn } from '@/components/VBtn'

// Utilities
import { genericComponent, useRender } from '@/util'

export const VCalendarMonthDay = genericComponent()({
  name: 'VCalendarMonthDay',

  props: {
    active: Boolean,
    color: String,
    day: Object,
    disabled: Boolean,
    events: Array<any>,
    title: [Number, String],

  },

  setup (props, { emit, slots }) {
    useRender(() => {
      const hasTitle = !!(props.title || slots.title)

      return (
        <div
          class={[
            'v-calendar-month__day',
          ]}
        >
          { !props.day?.isHidden && hasTitle && (
            <div key="title" class="v-calendar-weekly__day-label">
              { slots.title?.() ?? (
                <VBtn
                  class={ props.day?.isToday ? 'v-calendar-weekly__day-label__today' : undefined }
                  color={ props.color }
                  disabled={ props.disabled }
                  icon
                  size="x-small"
                  variant={ props.day?.isToday ? undefined : 'flat' }
                >
                  { props.title }
                </VBtn>
              )}
            </div>
          )}
          <div key="content" class="v-calendar-weekly__day-content">
            { slots.content?.() ?? (
              <div>
                <div class="v-calendar-weekly__day-alldayevents-container">
                  { props.events?.filter(event => event.allDay).map(event => (
                    <VCalendarEvent day={ props.day } event={ event } allDay />
                  ))}
                </div>
                <div class="v-calendar-weekly__day-events-container">
                  { props.events?.filter(event => !event.allDay).map(event => (
                    <VCalendarEvent day={ props.day } event={ event } />
                  ))}
                </div>
              </div>
            )}
          </div>

          { slots.default?.() }
        </div>
      )
    })

    return {}
  },
})

export type VCalendarMonthDay = InstanceType<typeof VCalendarMonthDay>
