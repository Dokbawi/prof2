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
        memoList : []
    }

    timerStart = () => {
        this.interval = setInterval(() => {
            this.setState({
                time : this.state.time + 1
            });
        }, 1000);  
    }

    
    timerStop = () => {
        clearInterval(this.interval);
    }

    
    timerMemo = () => {
        let temp = this.state.memoList || [];
        temp.push(this.state.time);
        this.setState({
            memoList : temp
        })

    }

    render() {
        return (
            <>
                {this.state.time}

                <button onClick={this.timerStart}>시작</button>
                <button onClick={this.timerStop}>중지</button>
                <button onClick={this.timerMemo}>기록</button>

                {
                    this.state.memoList.map((v) => {
                        return (
                            <>
                                <div key={v}>
                                    {v}
                                </div>
                            </>
                        )
                    })
                }
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
            let time = i;
            let tempMap = {};
            tempMap.val = time;
            if(i > 12) {
                text = 'Pm';
                time  = time - 11;
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
                console.log('list[i].hour : ', list[i].hour , 'hour : ', hour);
                console.log('list[i].minute : ', list[i].minute , 'hour : ', minute);
                if(list[i].hour == hour && list[i].minute == minute) {
                    console.log('hi');
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

    render() {
        return(
            <>
                <select onChange={this.hourSelectChange}>
                    {
                        this.hourOptions.map((v) => {
                            return (
                                <>
                                    <option key={v.value} value={v.val}>{v.text}</option>
                                </>
                            )
                        })
                    }
                </select>


                <select onChange={this.minuteSelectChange}>
                    {
                        this.minuteOptions.map((v) =>{
                            return (
                                <>
                                    <option key={v.val} value={v.val}>{v.text}</option>
                                </>
                            )
                        })
                    }
                </select>


                <button onClick={this.addAlarm}>알림 추가</button>

                {
                    this.state.alarmList.map((v) => {
                        return (
                            <>
                                {v.hour} : {v.minute}
                            </>
                        )
                    })
                }
                {this.openAlarmDialog()}
            </>
        )
    }
}


const AlarmDialog = (props) => {
    const { hour, minute } = props.time;

    const audio = React.createRef();
    const audioSrc = '/music/alarm.mp3';

    const offAlarm = () => {
        audio.pause();
    }

    return (
        <>
            <div>
                {hour} : {minute}
                <iframe src={audioSrc} ></iframe>
                <button onClick={props.handleClick}>알림닫기</button>
            </div>
        </>
    )

}

export default Timer;