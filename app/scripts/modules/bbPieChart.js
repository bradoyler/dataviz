/* global bb */

const data = [
  ['Southwest', 151740277],
  ['United', 99769952],
  ['American', 144189749],
  ['Delta', 142286020],
  ['JetBlue', 38241080],
  ['Alaska', 24370439],
  ['SkyWest', 31204880],
  ['Other', 299051986]
]

bb.generate({
  data: {
    columns: data,
    type: 'pie'
  },
  pie: {
    label: {
      format: function (value, ratio, id) {
        return id
      }
    }
  },
  bindto: '#bbchart3'
})
