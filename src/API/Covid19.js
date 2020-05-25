function capitalize(str) {
  str = str.split(' ');
  for (let i = 0, x = str.length; i < x; i++) {
    str[i] = str[i][0].toUpperCase() + str[i].substr(1);
  }
  return str.join(" ");
}

class Covid19 {
  constructor(api) {
    this.api = api;
  }
    
  async getCovidDataByState(state) {
    try {
      const res = await this.api.get('https://covid19api.io/api/v1/CasesInAllUSStates');
      const data = JSON.parse(res);  
      const stateData = data.data[0].table.filter(o => o.USAState === capitalize(state.trim()));
      return stateData;  
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
  
module.exports = Covid19;