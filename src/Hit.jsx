import React from 'react';
import hitmarkSquare from './images/hitmarkSquare.png';
import hitmarkCircle from './images/hitmarkCircle.png';
import hitmarkTri from './images/hitmarkTri.png';
import './Hit.scss';
import Result from './Result';

export default class Hit extends React.Component  {


constructor(props){
    super(props);
    this.state = {
        //今矢が何本目なのかを保持しておく
        //大前、中、落ちのどれかを判定するのと、いくつ画像を表示するかを残す
        arrow_count: 0,
        clickX:0,
        clickY:0,
        //0本の時も合わせて13こ位置を用意する
        arrow_x:[0,0,0,0,0,0,0,0,0,0,0,0,0],
        arrow_y:[0,0,0,0,0,0,0,0,0,0,0,0,0],
        //色を何個持っているかを保持し、子コンポーネント(Result)に渡す
        //この時、3人分のデータ、それぞれ六色のデータを保持できる
        color:[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]],
        sum_score:0,
        hit_num:0,
    }
}

    handleGetClickPlace(e){
        let pX = 0;
        let pY = 0;
        //ここでクリックした位置を取得する

        pX = e.nativeEvent.pageX;
        pY = e.nativeEvent.pageY;
        this.setState({clickX: pX.offsetX,clickY:pY});

        //stateのなかの配列を変更したいので、slice()で配列を持ってくる
        const arrow_x_copy = this.state.arrow_x.slice();
        const arrow_y_copy = this.state.arrow_y.slice();
        arrow_x_copy[this.state.arrow_count+1] = pX;
        arrow_y_copy[this.state.arrow_count+1] = pY;

        this.setState({
            clickX:pX,
            clickY:pY,
            arrow_x:arrow_x_copy,
            arrow_y:arrow_y_copy
        });

        this.handleColorUpdate(pX,pY);

    }

    judgeColor(x,y){//座標を元に何点だったかを返す関数
        //この関数は点数を返すため、それが何色なのかは関数呼び出しもとで処理してもらう
        const C_x = 499;
        const C_y = 447;

        let distance = 0;
        //距離を計算　二乗＋2乗　のルート
        distance = ((C_x - x) * (C_x - x)) + ((C_y - y) * (C_y - y));
        //ルートを取る
        distance = Math.sqrt(distance);
        //整数に丸める
        distance = Math.ceil(distance);

        if(distance < 48){//黄色のところ
            return 10;
        }else if(48<= distance && distance < 92){//赤のところ
            return 9;
        }else if(92<= distance && distance < 155){//青
            return 7;
        }else if(155<= distance && distance < 201){//黒のところ
            return 5;
        }else if(201<= distance && distance < 248){//白のところ
            return 3;
        }else if(248 <= distance){//緑
            return 0;
        }
    }

    getCurrentArrowNum(){
        //現在の矢の本数を返す予定だけど呼び出せない・。。。？
        return this.state.arrow_count;
    }

    handleInitialize(){
        //初期化関数なので、arrow_countを0に戻して一つもヒットマーカーが出ないようにする
        this.setState({
            arrow_count:0,
            arrow_count: 0,
            clickX:0,
            clickY:0,
            //0本の時も合わせて13こ位置を用意する
            arrow_x:[0,0,0,0,0,0,0,0,0,0,0,0,0],
            arrow_y:[0,0,0,0,0,0,0,0,0,0,0,0,0],
            //色を何個持っているかを保持し、子コンポーネント(Result)に渡す
            //この時、3人分のデータ、それぞれ六色のデータを保持できる
            color:[[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]],
            sum_score:0,
            hit_num:0,
        });
    }

    handleCreateImg(e){
        
        
        //ここでクリック位置の情報をstate.X,state.Yに代入し保持、その後
        this.handleGetClickPlace(e);
        //その座標情報を使ってrenderの中の画像のcssに適用
        //また、画像の表示数を保持するarrow_countをインクリメント
        this.setState({
            arrow_count:this.state.arrow_count + 1
        });

        
        
    }

    handleColorUpdate(x,y){
        const color_copy = this.state.color.slice();
        const current_num = this.state.arrow_count;

                if(this.judgeColor(x,y) == 10){//黄色の時は
                    color_copy[current_num%3][0]++;
                    this.setState({
                        sum_score:this.state.sum_score + 10,
                        hit_num:this.state.hit_num + 1,
                    })
                }else if(this.judgeColor(x,y) == 9){//赤の時
                    color_copy[current_num%3][1]++;
                    this.setState({
                        sum_score:this.state.sum_score + 9,
                        hit_num:this.state.hit_num + 1,
                    })
                }else if(this.judgeColor(x,y) == 7){//青の時
                    color_copy[current_num%3][2]++;
                    this.setState({
                        sum_score:this.state.sum_score + 7,
                        hit_num:this.state.hit_num + 1,
                    })
                }else if(this.judgeColor(x,y) == 5){//黒の時
                    color_copy[current_num%3][3]++;
                    this.setState({
                        sum_score:this.state.sum_score + 5,
                        hit_num:this.state.hit_num + 1,
                    })
                }else if(this.judgeColor(x,y) == 3){//白の時
                    color_copy[current_num%3][4]++;
                    this.setState({
                        sum_score:this.state.sum_score + 3,
                        hit_num:this.state.hit_num + 1,
                    })
                }else if(this.judgeColor(x,y) == 0){//緑の時
                    color_copy[current_num%3][5]++;
                }
        this.setState({//最後に更新する
                color:color_copy,
            });
    }

    render(){
        //ここからpropsで渡す値を代入していく

        const {clickX,clickY} = this.state;
        const arrow_x_copy = this.state.arrow_x.slice();
        const arrow_y_copy = this.state.arrow_y.slice();
        const sum_score = this.state.sum_score;
        const result_info = this.state.color.slice();
        const arrow_num = this.state.arrow_count;
        const arrow_position_1 = {
            position:'absolute',
            top: arrow_y_copy[1]-10,
            left: arrow_x_copy[1]-10,
        };
        const arrow_position_2 = {
            position:'absolute',
            top:arrow_y_copy[2]-10,
            left:arrow_x_copy[2]-10
        };
        const arrow_position_3 = {
            position:'absolute',
            top:arrow_y_copy[3]-10,
            left:arrow_x_copy[3]-10
        };
        const arrow_position_4 = {
            position:'absolute',
            top:arrow_y_copy[4]-10,
            left:arrow_x_copy[4]-10
        };
        const arrow_position_5 = {
            position:'absolute',
            top:arrow_y_copy[5]-10,
            left:arrow_x_copy[5]-10
        };
        const arrow_position_6 = {
            position:'absolute',
            top:arrow_y_copy[6]-10,
            left:arrow_x_copy[6]-10
        };
        const arrow_position_7 = {
            position:'absolute',
            top:arrow_y_copy[7]-10,
            left:arrow_x_copy[7]-10
        };
        const arrow_position_8 = {
            position:'absolute',
            top:arrow_y_copy[8]-10,
            left:arrow_x_copy[8]-10
        };
        const arrow_position_9 = {
            position:'absolute',
            top:arrow_y_copy[9]-10,
            left:arrow_x_copy[9]-10
        };
        const arrow_position_10 = {
            position:'absolute',
            top:arrow_y_copy[10]-10,
            left:arrow_x_copy[10]-10
        };
        const arrow_position_11 = {
            position:'absolute',
            top:arrow_y_copy[11]-10,
            left:arrow_x_copy[11]-10
        };
        const arrow_position_12 = {
            position:'absolute',
            top:arrow_y_copy[12]-10,
            left:arrow_x_copy[12]-10
        };

        if(this.state.arrow_count === 0){//初期状態
        return (
            <>
            <div className = "Target">
            <p className  = "current_arrow_num">現在{arrow_num}本目</p>
              {/*<h1>mouse click position:{clickX} {clickY}</h1>*/}
            </div>
            <Result value = {result_info}/>
            </>
        );
        }else if(this.state.arrow_count === 1){//一本矢が存在するとき
            return (
                <>
                <div className = "Target">
                    <p className = "sum_score">現在{sum_score}</p>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "1" className = "hitmark" title = "1" style = {arrow_position_1} ></img>
                <p className = "number_of_arrow" id = "1" style = {arrow_position_1}>1</p>
                <p className  = "current_arrow_num">現在{arrow_num}本目</p>
                  {/*<h1>mouse click position:{clickX} {clickY}</h1>*/}
                </div>
                <Result value = {result_info}/>
                </>
            );
        }else if(this.state.arrow_count === 2){
            return (
                <>
                <div className = "Target">
                <img src = {hitmarkSquare} title = "1" alt = "notGetImg" id = "1" className = "hitmark" style = {arrow_position_1}></img>
                <img src = {hitmarkCircle} title = "2" alt = "notGetImg" id = "2" className = "hitmark" style = {arrow_position_2}></img>
                <p className = "number_of_arrow" id = "1" style = {arrow_position_1}>1</p>
                <p className = "number_of_arrow" id = "2" style = {arrow_position_2}>1</p>
                <p className  = "current_arrow_num">現在{arrow_num}本目</p>
                  {/*<h1>mouse click position:{clickX} {clickY}</h1>*/}
                </div>
                <Result value = {result_info}/>
                </>
            );
        }else if(this.state.arrow_count === 3){
            return (
                <>
                <div className = "Target">
                <img src = {hitmarkSquare} title = "1" alt = "notGetImg" id = "1" className = "hitmark" style = {arrow_position_1}></img>
                <img src = {hitmarkCircle} title = "2" alt = "notGetImg" id = "2" className = "hitmark" style = {arrow_position_2}></img>
                <img src = {hitmarkTri} title = "3" alt = "notGetImg" id = "3" className = "hitmark" style = {arrow_position_3}></img>
                <p className = "number_of_arrow" id = "1" style = {arrow_position_1}>1</p>
                <p className = "number_of_arrow" id = "2" style = {arrow_position_2}>1</p>
                <p className = "number_of_arrow" id = "3" style = {arrow_position_3}>1</p>
                <p className  = "current_arrow_num">現在{arrow_num}本目</p>
                  {/*<h1>mouse click position:{clickX} {clickY}</h1>*/}
                </div>
                <Result value = {result_info}/>
                </>
            );
        }else if(this.state.arrow_count === 4){
            return (
                <>
                <div className = "Target">
                <img src = {hitmarkSquare} alt = "notGetImg" id = "1" className = "hitmark" style = {arrow_position_1}></img>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "2" className = "hitmark" style = {arrow_position_2}></img>
                <img src = {hitmarkTri} alt = "notGetImg" id = "3" className = "hitmark" style = {arrow_position_3}></img>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "4" className = "hitmark" style = {arrow_position_4}/>
                <p className = "number_of_arrow" id = "1" style = {arrow_position_1}>1</p>
                <p className = "number_of_arrow" id = "2" style = {arrow_position_2}>1</p>
                <p className = "number_of_arrow" id = "3" style = {arrow_position_3}>1</p>
                <p className = "number_of_arrow" id = "4" style = {arrow_position_4}>2</p>
                <p className  = "current_arrow_num">現在{arrow_num}本目</p>
                  {/*<h1>mouse click position:{clickX} {clickY}</h1>*/}
                </div>
                <Result value = {result_info}/>
                </>
            );
        }else if(this.state.arrow_count === 5){
            return (
                <>
                <div className = "Target">
                <img src = {hitmarkSquare} alt = "notGetImg" id = "1" className = "hitmark" style = {arrow_position_1}></img>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "2" className = "hitmark" style = {arrow_position_2}></img>
                <img src = {hitmarkTri} alt = "notGetImg" id = "3" className = "hitmark" style = {arrow_position_3}></img>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "4" className = "hitmark" style = {arrow_position_4}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "5" className = "hitmark" style = {arrow_position_5} />
                <p className = "number_of_arrow" id = "1" style = {arrow_position_1}>1</p>
                <p className = "number_of_arrow" id = "2" style = {arrow_position_2}>1</p>
                <p className = "number_of_arrow" id = "3" style = {arrow_position_3}>1</p>
                <p className = "number_of_arrow" id = "4" style = {arrow_position_4}>2</p>
                <p className = "number_of_arrow" id = "5" style = {arrow_position_5}>2</p>
                <p className  = "current_arrow_num">現在{arrow_num}本目</p>
                  {/*<h1>mouse click position:{clickX} {clickY}</h1>*/}
                </div>
                <Result value = {result_info}/>
                </>
            );
        }else if(this.state.arrow_count === 6){
            return (
                <>
                <div className = "Target">
                <img src = {hitmarkSquare} alt = "notGetImg" id = "1" className = "hitmark" style = {arrow_position_1}></img>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "2" className = "hitmark" style = {arrow_position_2}></img>
                <img src = {hitmarkTri} alt = "notGetImg" id = "3" className = "hitmark" style = {arrow_position_3}></img>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "4" className = "hitmark" style = {arrow_position_4}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "5" className = "hitmark" style = {arrow_position_5}/>
                <img src = {hitmarkTri} alt = "notGetImg" id = "6" className = "hitmark" style = {arrow_position_6}/>
                <p className = "number_of_arrow" id = "1" style = {arrow_position_1}>1</p>
                <p className = "number_of_arrow" id = "2" style = {arrow_position_2}>1</p>
                <p className = "number_of_arrow" id = "3" style = {arrow_position_3}>1</p>
                <p className = "number_of_arrow" id = "4" style = {arrow_position_4}>2</p>
                <p className = "number_of_arrow" id = "5" style = {arrow_position_5}>2</p>
                <p className = "number_of_arrow" id = "6" style = {arrow_position_6}>2</p>
                <p className  = "current_arrow_num">現在{arrow_num}本目</p>
                  {/*<h1>mouse click position:{clickX} {clickY}</h1>*/}
                </div>
                <Result value = {result_info}/>
                </>
            );
        }else if(this.state.arrow_count === 7){
            return (
                <>
                <div className = "Target">
                <img src = {hitmarkSquare} alt = "notGetImg" id = "1" className = "hitmark" style = {arrow_position_1}></img>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "2" className = "hitmark" style = {arrow_position_2}></img>
                <img src = {hitmarkTri} alt = "notGetImg" id = "3" className = "hitmark" style = {arrow_position_3}></img>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "4" className = "hitmark" style = {arrow_position_4}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "5" className = "hitmark" style = {arrow_position_5}/>
                <img src = {hitmarkTri} alt = "notGetImg" id = "6" className = "hitmark" style = {arrow_position_6}/>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "7" className = "hitmark" style = {arrow_position_7} />
                <p className = "number_of_arrow" id = "1" style = {arrow_position_1}>1</p>
                <p className = "number_of_arrow" id = "2" style = {arrow_position_2}>1</p>
                <p className = "number_of_arrow" id = "3" style = {arrow_position_3}>1</p>
                <p className = "number_of_arrow" id = "4" style = {arrow_position_4}>2</p>
                <p className = "number_of_arrow" id = "5" style = {arrow_position_5}>2</p>
                <p className = "number_of_arrow" id = "6" style = {arrow_position_6}>2</p>
                <p className = "number_of_arrow" id = "7" style = {arrow_position_7}>3</p>
                <p className  = "current_arrow_num">現在{arrow_num}本目</p>
                  {/*<h1>mouse click position:{clickX} {clickY}</h1>*/}
                </div>
                <Result value = {result_info}/>
                </>
            );
        }else if(this.state.arrow_count === 8){
            return (
                <>
                <div className = "Target">
                <img src = {hitmarkSquare} alt = "notGetImg" id = "1" className = "hitmark" style = {arrow_position_1}></img>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "2" className = "hitmark" style = {arrow_position_2}></img>
                <img src = {hitmarkTri} alt = "notGetImg" id = "3" className = "hitmark" style = {arrow_position_3}></img>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "4" className = "hitmark" style = {arrow_position_4}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "5" className = "hitmark" style = {arrow_position_5}/>
                <img src = {hitmarkTri} alt = "notGetImg" id = "6" className = "hitmark" style = {arrow_position_6}/>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "7" className = "hitmark" style = {arrow_position_7} />
                <img src = {hitmarkCircle} alt = "notGetImg" id = "8" className = "hitmark" style = {arrow_position_8}/>
                <p className = "number_of_arrow" id = "1" style = {arrow_position_1}>1</p>
                <p className = "number_of_arrow" id = "2" style = {arrow_position_2}>1</p>
                <p className = "number_of_arrow" id = "3" style = {arrow_position_3}>1</p>
                <p className = "number_of_arrow" id = "4" style = {arrow_position_4}>2</p>
                <p className = "number_of_arrow" id = "5" style = {arrow_position_5}>2</p>
                <p className = "number_of_arrow" id = "6" style = {arrow_position_6}>2</p>
                <p className = "number_of_arrow" id = "7" style = {arrow_position_7}>3</p>
                <p className = "number_of_arrow" id = "8" style = {arrow_position_8}>3</p>
                <p className  = "current_arrow_num">現在{arrow_num}本目</p>
                  {/*<h1>mouse click position:{clickX} {clickY}</h1>*/}
                </div>
                <Result value = {result_info}/>
                </>
            );
        }else if(this.state.arrow_count === 9){
            return (
                <>
                <div className = "Target">
                <img src = {hitmarkSquare} alt = "notGetImg" id = "1" className = "hitmark" style = {arrow_position_1}></img>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "2" className = "hitmark" style = {arrow_position_2}></img>
                <img src = {hitmarkTri} alt = "notGetImg" id = "3" className = "hitmark" style = {arrow_position_3}></img>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "4" className = "hitmark" style = {arrow_position_4}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "5" className = "hitmark" style = {arrow_position_5}/>
                <img src = {hitmarkTri} alt = "notGetImg" id = "6" className = "hitmark" style = {arrow_position_6}/>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "7" className = "hitmark" style = {arrow_position_7}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "8" className = "hitmark" style = {arrow_position_8}/>
                <img src = {hitmarkTri} alt = "notGetImg" id = "9" className = "hitmark" style = {arrow_position_9}/>
                <p className = "number_of_arrow" id = "1" style = {arrow_position_1}>1</p>
                <p className = "number_of_arrow" id = "2" style = {arrow_position_2}>1</p>
                <p className = "number_of_arrow" id = "3" style = {arrow_position_3}>1</p>
                <p className = "number_of_arrow" id = "4" style = {arrow_position_4}>2</p>
                <p className = "number_of_arrow" id = "5" style = {arrow_position_5}>2</p>
                <p className = "number_of_arrow" id = "6" style = {arrow_position_6}>2</p>
                <p className = "number_of_arrow" id = "7" style = {arrow_position_7}>3</p>
                <p className = "number_of_arrow" id = "8" style = {arrow_position_8}>3</p>
                <p className = "number_of_arrow" id = "9" style = {arrow_position_9}>3</p>
                <p className  = "current_arrow_num">現在{arrow_num}本目</p>
                  {/*<h1>mouse click position:{clickX} {clickY}</h1>*/}
                </div>
                <Result value = {result_info}/>
                </>
            );
        }else if(this.state.arrow_count === 10){
            return (
                <>
                <div className = "Target">
                <img src = {hitmarkSquare} alt = "notGetImg" id = "1" className = "hitmark" style = {arrow_position_1}></img>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "2" className = "hitmark" style = {arrow_position_2}></img>
                <img src = {hitmarkTri} alt = "notGetImg" id = "3" className = "hitmark" style = {arrow_position_3}></img>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "4" className = "hitmark" style = {arrow_position_4}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "5" className = "hitmark" style = {arrow_position_5}/>
                <img src = {hitmarkTri} alt = "notGetImg" id = "6" className = "hitmark" style = {arrow_position_6}/>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "7" className = "hitmark" style = {arrow_position_7} />
                <img src = {hitmarkCircle} alt = "notGetImg" id = "8" className = "hitmark" style = {arrow_position_8}/>
                <img src = {hitmarkTri} alt = "notGetImg" id = "9" className = "hitmark" style = {arrow_position_9}/>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "10" className = "hitmark" style = {arrow_position_10}/>
                <p className = "number_of_arrow" id = "1" style = {arrow_position_1}>1</p>
                <p className = "number_of_arrow" id = "2" style = {arrow_position_2}>1</p>
                <p className = "number_of_arrow" id = "3" style = {arrow_position_3}>1</p>
                <p className = "number_of_arrow" id = "4" style = {arrow_position_4}>2</p>
                <p className = "number_of_arrow" id = "5" style = {arrow_position_5}>2</p>
                <p className = "number_of_arrow" id = "6" style = {arrow_position_6}>2</p>
                <p className = "number_of_arrow" id = "7" style = {arrow_position_7}>3</p>
                <p className = "number_of_arrow" id = "8" style = {arrow_position_8}>3</p>
                <p className = "number_of_arrow" id = "9" style = {arrow_position_9}>3</p>
                <p className = "number_of_arrow" id = "10" style = {arrow_position_10}>4</p>
                <p className  = "current_arrow_num">現在{arrow_num}本目</p>
                  {/*<h1>mouse click position:{clickX} {clickY}</h1>*/}
                </div>
                <Result value = {result_info}/>
                </>
            );
        }else if(this.state.arrow_count === 11){
            return (
                <>
                <div className = "Target">
                <img src = {hitmarkSquare} alt = "notGetImg" id = "1" className = "hitmark" style = {arrow_position_1}></img>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "2" className = "hitmark" style = {arrow_position_2}></img>
                <img src = {hitmarkTri} alt = "notGetImg" id = "3" className = "hitmark" style = {arrow_position_3}></img>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "4" className = "hitmark" style = {arrow_position_4}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "5" className = "hitmark" style = {arrow_position_5}/>
                <img src = {hitmarkTri} alt = "notGetImg" id = "6" className = "hitmark" style = {arrow_position_6}/>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "7" className = "hitmark" style = {arrow_position_7}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "8" className = "hitmark" style = {arrow_position_8}/>
                <img src = {hitmarkTri} alt = "notGetImg" id = "9" className = "hitmark" style = {arrow_position_9}/>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "10" className = "hitmark" style = {arrow_position_10}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "11" className = "hitmark" style = {arrow_position_11}/>
                <p className = "number_of_arrow" id = "1" style = {arrow_position_1}>1</p>
                <p className = "number_of_arrow" id = "2" style = {arrow_position_2}>1</p>
                <p className = "number_of_arrow" id = "3" style = {arrow_position_3}>1</p>
                <p className = "number_of_arrow" id = "4" style = {arrow_position_4}>2</p>
                <p className = "number_of_arrow" id = "5" style = {arrow_position_5}>2</p>
                <p className = "number_of_arrow" id = "6" style = {arrow_position_6}>2</p>
                <p className = "number_of_arrow" id = "7" style = {arrow_position_7}>3</p>
                <p className = "number_of_arrow" id = "8" style = {arrow_position_8}>3</p>
                <p className = "number_of_arrow" id = "9" style = {arrow_position_9}>3</p>
                <p className = "number_of_arrow" id = "10" style = {arrow_position_10}>4</p>
                <p className = "number_of_arrow" id = "11" style = {arrow_position_11}>4</p>
                <p className  = "current_arrow_num">現在{arrow_num}本目</p>
                  {/*<h1>mouse click position:{clickX} {clickY}</h1>*/}
                </div>
                <Result value = {result_info}/>
                </>
            );
        }else if(this.state.arrow_count === 12){
            return (
                <>
                <div className = "Target">
                <img src = {hitmarkSquare} alt = "notGetImg" id = "1" className = "hitmark" style = {arrow_position_1}></img>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "2" className = "hitmark" style = {arrow_position_2}></img>
                <img src = {hitmarkTri} alt = "notGetImg" id = "3" className = "hitmark" style = {arrow_position_3}></img>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "4" className = "hitmark" style = {arrow_position_4}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "5" className = "hitmark" style = {arrow_position_5}/>
                <img src = {hitmarkTri} alt = "notGetImg" id = "6" className = "hitmark" style = {arrow_position_6}/>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "7" className = "hitmark" style = {arrow_position_7}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "8" className = "hitmark" style = {arrow_position_8}/>
                <img src = {hitmarkTri} alt = "notGetImg" id = "9" className = "hitmark" style = {arrow_position_9}/>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "10" className = "hitmark" style = {arrow_position_10}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "11" className = "hitmark" style = {arrow_position_11}/>
                <img src = {hitmarkTri} alt = "notGetImg" id = "12" className = "hitmark" style = {arrow_position_12}/>
                <p className = "number_of_arrow" id = "1" style = {arrow_position_1}>1</p>
                <p className = "number_of_arrow" id = "2" style = {arrow_position_2}>1</p>
                <p className = "number_of_arrow" id = "3" style = {arrow_position_3}>1</p>
                <p className = "number_of_arrow" id = "4" style = {arrow_position_4}>2</p>
                <p className = "number_of_arrow" id = "5" style = {arrow_position_5}>2</p>
                <p className = "number_of_arrow" id = "6" style = {arrow_position_6}>2</p>
                <p className = "number_of_arrow" id = "7" style = {arrow_position_7}>3</p>
                <p className = "number_of_arrow" id = "8" style = {arrow_position_8}>3</p>
                <p className = "number_of_arrow" id = "9" style = {arrow_position_9}>3</p>
                <p className = "number_of_arrow" id = "10" style = {arrow_position_10}>4</p>
                <p className = "number_of_arrow" id = "11" style = {arrow_position_11}>4</p>
                <p className = "number_of_arrow" id = "12" style = {arrow_position_12}>4</p>
                <p className  = "current_arrow_num">現在{arrow_num}本目</p>
                  {/*<h1>mouse click position:{clickX} {clickY}</h1>*/}
                </div>
                <Result value = {result_info}/>
                </>
            );
        }else{//１２本を超えたら初期化するか否か
            return (
                <>
                <div className = "Target">
                <img src = {hitmarkSquare} alt = "notGetImg" id = "1" className = "hitmark" style = {arrow_position_1}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "2" className = "hitmark" style = {arrow_position_2}/>
                <img src = {hitmarkTri} alt = "notGetImg" id = "3" className = "hitmark" style = {arrow_position_3}/>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "4" className = "hitmark" style = {arrow_position_4}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "5" className = "hitmark" style = {arrow_position_5}/>
                <img src = {hitmarkTri} alt = "notGetImg" id = "6" className = "hitmark" style = {arrow_position_6}/>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "7" className = "hitmark" style = {arrow_position_7}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "8" className = "hitmark" style = {arrow_position_8}/>
                <img src = {hitmarkTri} alt = "notGetImg" id = "9" className = "hitmark" style = {arrow_position_9}/>
                <img src = {hitmarkSquare} alt = "notGetImg" id = "10" className = "hitmark" style = {arrow_position_10}/>
                <img src = {hitmarkCircle} alt = "notGetImg" id = "11" className = "hitmark" style = {arrow_position_11}/>
                <img src = {hitmarkTri} alt = "notGetImg" id = "12" className = "hitmark" style = {arrow_position_12}/>
                <p className = "number_of_arrow" id = "1" style = {arrow_position_1}>1</p>
                <p className = "number_of_arrow" id = "2" style = {arrow_position_2}>1</p>
                <p className = "number_of_arrow" id = "3" style = {arrow_position_3}>1</p>
                <p className = "number_of_arrow" id = "4" style = {arrow_position_4}>2</p>
                <p className = "number_of_arrow" id = "5" style = {arrow_position_5}>2</p>
                <p className = "number_of_arrow" id = "6" style = {arrow_position_6}>2</p>
                <p className = "number_of_arrow" id = "7" style = {arrow_position_7}>3</p>
                <p className = "number_of_arrow" id = "8" style = {arrow_position_8}>3</p>
                <p className = "number_of_arrow" id = "9" style = {arrow_position_9}>3</p>
                <p className = "number_of_arrow" id = "10" style = {arrow_position_10}>4</p>
                <p className = "number_of_arrow" id = "11" style = {arrow_position_11}>4</p>
                <p className = "number_of_arrow" id = "12" style = {arrow_position_12}>4</p>
                <p className  = "current_arrow_num">現在{arrow_num}本目</p>
                  {/*<h1>mouse click position:{clickX} {clickY}</h1>*/}
                </div>
                <Result value = {result_info}/>
                
                </>
            );

        }
        
    }


}
