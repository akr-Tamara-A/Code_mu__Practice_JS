
export default class TabButtons {
  constructor(nodeTabList, btnPrev, btnNext) {
    this._nodeTabList = nodeTabList;
    this._tabList = Array.from(this._nodeTabList);
    this._btnPrev = btnPrev;
    this._btnNext = btnNext;
    //console.log(this._tabList)
  }

  setListeners() {
    
  }
}