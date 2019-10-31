import React from 'react';
import SubMenu from './component/SubMenu';
import './Timer.css'


class Timer extends React.Component {
    menuList = [
        'Stop Watch',
        'Alarm Clock',
    ]

    state = {
        idx : 0
    };

    getIdx = (index) => {
        this.setState({
            idx: index
        });
    }

    showContent = () => {
        return this.state.idx === 0 ? <StopWatch /> : <AlarmClock />; 
    }

    render() {
        return (
            <>
                <SubMenu menuList={this.menuList} handleClick={this.getIdx.bind(this)} onMenuIdx={this.state.idx} />
                {this.showContent()}
            </>
        );
    }
}


class StopWatch extends React.Component {
    interval;
    state = {
        time : 0,
        memoList : [],
        timeText : "00 : 00",
        timeSmallText : ".00"
    }

    timerStart = () => {
        clearInterval(this.interval);
        this.interval = setInterval(() => {
            let ms = (this.state.time + 1) % 100;
            let s = Math.floor((this.state.time + 1) / 100) % 60;
            let min = Math.floor((this.state.time + 1) / 6000) % 60;



            if(min === 60) {
                clearInterval(this.interval);
                alert('60분이 최대입니다');
                return;
            }

            this.setState({
                time : this.state.time + 1,
                timeText : ((min < 10) ? "0" + min : min) + " : " +
                (s < 10 ? "0" + s : s),
                timeSmallText : (ms < 10 ? ".0" + ms : "." + ms)
            });

        }, 10);  
    }
    
    timerStop = () => {
        clearInterval(this.interval);
    }    
    
    timerReset = () => {
        clearInterval(this.interval);
        this.setState({
            time : 0,
            timeText : "00 : 00",
            timeSmallText : ".00"
        });
    }
    
    timerMemo = () => {
        let temp = this.state.memoList || [];
        temp.push(this.state.time);
        this.setState({
            memoList : temp
        })

    }

    timerMemoText = (time) =>{
        const ms = time % 100;
        const second = Math.floor(time / 100) % 60;
        const min = Math.floor(time / 6000) % 60;
        let text = "";
        text += (min !== 0) ? min + "분 " : "";
        text += second + "초 ";
        text += ms + "밀리초";
        return text;
    }

    render() {
        return (
            <>
                <div className="Timer-main">
                    <div className="Timer-time-box">
                        <span>
                            {this.state.timeText}
                        </span>
                        <span className="Timer-time-small">
                            {this.state.timeSmallText}
                        </span>
                    </div>

                    <div className="Timer-control-box">
                        <button className="Timer-control-btn" onClick={this.timerStart}>시작</button>
                        <button className="Timer-control-btn" onClick={this.timerStop}>중지</button>
                        <button className="Timer-control-btn" onClick={this.timerReset}>리셋</button>
                        <button className="Timer-control-btn" onClick={this.timerMemo}>기록</button>
                    </div>
                    
                    <div className="Timer-memo-box">
                        {
                            this.state.memoList.map((v, idx) => {
                                return (
                                    <div className="Timer-memo-item" key={idx}>
                                        {idx + 1}. {this.timerMemoText(v)}
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>

            </>
        )
    }
}

class AlarmClock extends React.Component {
    constructor(props) {
        super(props);
        this.hourOptions = [];
        this.minuteOptions = [];
        this.checkInterval;

        for(let i = 0 ; i < 24; i ++) {
            let text = 'Am';
            let time = i + 1;
            let tempMap = {};
            tempMap.val = time;
            if(i > 11) {
                text = 'Pm';
                time  = i % 12 + 1;
            }
            tempMap.text = text + " " + time;
            this.hourOptions.push(tempMap);
        }

        for(let i = 0; i < 60; i++) {
            this.minuteOptions.push({
                val : i, 
                text :  i  + "분"
            });
        }


        this.checkInterval = setInterval(() => {
            let time = new Date();
            let hour = time.getHours();
            let minute = time.getMinutes();
            let list = this.state.alarmList;

            for(let i = 0 ; i < list.length; i++ ) {
                if(list[i].hour == hour && list[i].minute == minute) {
                    list.splice(i, 1);

                    this.setState({
                        isOpen : true,
                        alarmList : list,
                    })
                    break;
                }
            }
        },1000);
    }

    minuteSelect;
    hourSelect;

    state = {
        alarmList : [],
        hour : 1,
        minute : 0,
        isOpen : false
    }

    hourSelectChange = (e) => {
        this.setState({
            hour : e.target.value
        });
    }

    minuteSelectChange = (e) => {
        this.setState({
            minute : e.target.value
        });
    }

    addAlarm = () => {
        let hour = this.state.hour;
        let minute = this.state.minute;
        let list = this.state.alarmList || [];

        list.push({
            hour : hour,
            minute : minute
        });
        this.setState({
            alarmList : list
        });
    }

    closeAlarmDialog = () => {
        this.setState({
            isOpen : false
        });
    }

    openAlarmDialog = () => {
        return this.state.isOpen ? <AlarmDialog handleClick={this.closeAlarmDialog.bind(this)} time={this.state} /> : null;
    }

    delAlarm = (idx) =>{
        let list = this.state.alarmList || [];
        list.splice(idx, 1);
        this.setState({
            alertList : list
        });
    }

    render() {
        return(
            <>
                <div className="Timer-Alarm-main">
                    <div className="Timer-Alarm-time-box">
                        <div>
                            <div>시간</div>
                            <div>분</div>
                        </div>

                        <div>
                            <select onChange={this.hourSelectChange}>
                                {
                                    this.hourOptions.map((v, idx) => {
                                        return (
                                            <option key={idx} value={v.val}>{v.text}</option>
                                        )
                                    })
                                }
                            </select>
                            <select onChange={this.minuteSelectChange}>
                                {
                                    this.minuteOptions.map((v, idx) =>{
                                        return (
                                            <option key={idx} value={v.val}>{v.text}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div className="Timer-Alarm-control-box">
                        <button className="Timer-Alarm-control-btn" onClick={this.addAlarm}>알림 추가</button>
                    </div>

                    <div className="Timer-Alarm-alert-box">
                        {
                            this.state.alarmList.map((v, idx) => {
                                return (
                                    <div className="Timer-Alarm-alert-item" key={idx}>
                                        <div >
                                            {idx + 1}.  {((v.hour > 11) ? "PM" : "AM")} {((v.hour -1) % 12 ) + 1}시 : {v.minute}분
                                        </div>

                                        <button className="Timer-Alarm-alert-btn" onClick={()=>this.delAlarm(idx)}>
                                            알림 삭제
                                        </button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    
                    {this.openAlarmDialog()}
                </div>
            </>
        )
    }
}


const AlarmDialog = (props) => {
    const { hour, minute } = props.time;

    const audio = React.createRef();
    const audioSrc = '/music/alarm.mp3';
    const audioStyle ={
        display : "none"
    }

    const offAlarm = () => {
        audio.pause();
    }

    return (
        <>
            <div className="Timer-dialog-container">
                <div className="Timer-dialog-menu-box">
                    <button onClick={props.handleClick}>알림닫기</button>
                </div>

                <div className="Timer-dialog-main">
                    {((hour > 11) ? "PM" : "AM")} {((hour -1) % 12 ) + 1}시 : {minute}분 알림입니다.
                </div>
                <iframe style={audioStyle} src={audioSrc} ></iframe>
            </div>
        </>
    )

}

export default Timer;