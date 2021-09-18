import React from 'react';
import './Result.scss';

export default class Result extends React.Component{
    constructor(props){
        super(props);

    }

    //ここに関数を定義していく

    render(){
        //ここでpropsで受け取った値を分割代入する
        const first_yellow = this.props.value[0][0];
        const first_red = this.props.value[0][1];
        const first_blue = this.props.value[0][2];
        const first_black = this.props.value[0][3];
        const first_white = this.props.value[0][4];
        const first_green = this.props.value[0][5];

        const second_yellow = this.props.value[1][0];
        const second_red = this.props.value[1][1];
        const second_blue = this.props.value[1][2];
        const second_black = this.props.value[1][3];
        const second_white = this.props.value[1][4];
        const second_green = this.props.value[1][5];

        const third_yellow = this.props.value[2][0];
        const third_red = this.props.value[2][1];
        const third_blue = this.props.value[2][2];
        const third_black = this.props.value[2][3];
        const third_white = this.props.value[2][4];
        const third_green = this.props.value[2][5];

        const sum_yellow = first_yellow + second_yellow + third_yellow;
        const sum_red = first_red + second_red + third_red;
        const sum_blue = first_blue + second_blue + third_blue;
        const sum_black = first_black + second_black + third_black;
        const sum_white = first_white + second_white + third_white;
        const sum_green = first_green + second_green + third_green;

        //ここから何点取れたか

        const first_score = 10*first_yellow + 9 * first_red + 7 * first_blue + 5 * first_black + 3 * first_white;
        const second_score = 10*second_yellow + 9 * second_red + 7 * second_blue + 5 * second_black + 3 * second_white;
        const third_score = 10*third_yellow + 9 * third_red + 7 * third_blue + 5 * third_black + 3 * third_white;

        const sum_score = first_score + second_score + third_score;
        //ここから何本当たったか
        const first_hit = first_yellow + first_red + first_blue + first_black + first_white;
        const second_hit = second_yellow + second_red + second_blue + second_black + second_white;
        const third_hit = third_yellow + third_red + third_blue + third_black + third_white;

        const sum_hit = first_hit + second_hit + third_hit;

        //ここにレンダーで使うstateを定数に代入していく
        return (
        <div className="result" >
            <table border="1" className = "result_tbl">
            <tr>
            <th>  </th>
            <th>大前</th>
            <th>-中-</th>
            <th>落ち</th>
            <th>合計</th>
            </tr>

            <tr>
                <td className = "color">🟨</td>
                <td>{first_yellow}</td>
                <td>{second_yellow}</td>
                <td>{third_yellow}</td>
                <td>{sum_yellow}</td>
            </tr>
            <tr>
                <td className = "color">🟥</td>
                <td>{first_red}</td>
                <td>{second_red}</td>
                <td>{third_red}</td>
                <td>{sum_red}</td>
            </tr>
            <tr>
                <td className = "color">🟦</td>
                <td>{first_blue}</td>
                <td>{second_blue}</td>
                <td>{third_blue}</td>
                <td>{sum_blue}</td>
            </tr>
            <tr>
                <td className = "color">■</td>
                <td>{first_black}</td>
                <td>{second_black}</td>
                <td>{third_black}</td>
                <td>{sum_black}</td>
            </tr>
            <tr>
                <td className = "color">□</td>
                <td>{first_white}</td>
                <td>{second_white}</td>
                <td>{third_white}</td>
                <td>{sum_white}</td>
            </tr>
            <tr>
                <td className = "color">🟩</td>
                <td>{first_green}</td>
                <td>{second_green}</td>
                <td>{third_green}</td>
                <td>{sum_green}</td>
            </tr>
            <tr>
                <td className = "color">的中</td>
                <td>{first_hit}</td>
                <td>{second_hit}</td>
                <td>{third_hit}</td>
                <td>{sum_hit}</td>
            </tr>
            <tr>
                <td className = "color">得点</td>
                <td>{first_score}</td>
                <td>{second_score}</td>
                <td>{third_score}</td>
                <td>{sum_score}</td>
            </tr>
        </table>
        </div>
        );
    }
}

