<template>
  <div class="container">
    <div class="row">
      <div class="col-8">
        <input class="form-control" v-model="route">
      </div>
      <div>
        <button class="btn btn-primary" @click="get()">GET</button>
        <button class="btn btn-primary" @click="post()">POST</button>
        <button class="btn btn-primary" @click="emit()">Emit</button>
      </div>
    </div>
    <section class="row">
      <table class="table table-bordered">
        <tr>
          <th>Key</th>
          <th>Value</th>
          <th></th>
        </tr>
        <tr>
          <td colspan="3">
            <button @click="addRow()">Add Row</button>
          </td>
        </tr>
        <tr v-for="(p, i) in params" :key="i">
          <td>
            <input v-model="p.key">
          </td>
          <td>
            <input v-model="p.value">
          </td>
          <td>
            <button @click="removeRow(i)">X</button>
          </td>
        </tr>
      </table>
    </section>
    <section class="row">
      <h4>History:</h4>
      <table class="table table-bordered">
        <tr v-for="(h, i) in history" :key="i">
          <td>{{i +1}}</td>
          <td>{{h.method}}</td>
          <td>
            {{h.route}}
          </td>
          <td>
            <a href="#" @click.prevent="view(i)">
              View
            </a>
          </td>
          <td>
            <input v-model="selected" type="checkbox" :value="i">
          </td>
        </tr>
      </table>
    </section>
    <section class="row">
      <h3>Results:</h3>
      <pre class="results-box" v-for="(res,i) in resultsList" :key="i">
        {{res | pretty}}
      </pre>
    </section>
  </div>
</template>
<script>
  export default {
    computed: {
      resultsList () {
        let arr = []
        this.selected.forEach((item) => { arr.push(this.history[item].results) })
        return arr
      }
    },
    data () {
      return {
        selected: [],
        params: [
          {key: '', value: ''}
        ],
        route: 'http://localhost:3010/1.0/',
        history: [],
        results: []
      }
    },
    filters: {
      pretty (value) {
        try {
          return JSON.stringify(JSON.parse(value), null, 2)
        } catch (error) {
          return value
        }
      }
    },
    methods: {
      addHistory (method, res) {
        let his = {
          params: this.params,
          route: this.route,
          method,
          results: res
        }
        this.history.push(his)
      },
      addRow () {
        this.params.push({key: '', value: ''})
      },
      getParams () {
        let body = {}
        this.params.forEach((i) => {
          if (i.key && i.value) body[i.key] = i.value
        })
        return {body}
      },
      handleResponse (method, res) {
        this.results = [res]
        this.addHistory(method, res)
        this.selected = [this.history.length - 1]
      },
      emit () {
        console.log('--- emit ---', this.route)
        this.$socket.emit(this.route, this.getParams(), (res) => this.handleResponse('emit', res))
      },
      get () {
        this.$http.get(this.route, {params: this.getParams()})
          .then((res) => this.handleResponse('get', res))
          .catch((res) => this.handleResponse('get', res))
      },
      post () {
        this.$http.post(this.route, this.getParams())
          .then((res) => this.handleResponse('post', res))
          .catch((res) => this.handleResponse('post', res))
      },
      removeRow (i) {
        this.params.splice(i, 1)
      },
      selectResults (i) {
        console.log(this.selected)
        if (this.selected > 3) this.selected.shift()
      },
      view (i) {
        this.results = this.history[i].results
      }
    }
  }
</script>
<style>
  section {
    border-top: 1px solid #ccc;
    margin-top: 20px;
    padding-top: 20px;
  }
  .results-box {
    border: 2px #ccc solid;
    height: 200px;
    overflow: auto;
    width: 100%;
  }
</style>
