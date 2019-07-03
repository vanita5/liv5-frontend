import { createSelector } from 'reselect'

export const getLabels = state => state.liv5.get('labels')
export const getLabelsMappedToOptions = createSelector(
    [ getLabels ],
    labels => labels.map(label => ({
        key: label.label_id,
        value: label.label_id,
        text: label.name,
        label: {
            color: label.color,
            icon: label.icon,
        }
    }))
)