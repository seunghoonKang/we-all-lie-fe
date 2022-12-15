import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import React, { Component } from 'react';
import Camera from '../elements/Camera1';
import CameraEnd from '../elements/CameraEnd';
import styled from 'styled-components';
import GameEndContents from './gameend/GameEndContents';

const APPLICATION_SERVER_URL = 'https://minhyeongi.xyz/';

class OvReact extends Component {
  constructor(props) {
    super(props);

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      //----- mySessionId에 param.id 를 props로 받아와서 넣어주었음 (해당방의 param.id = sessionId)
      mySessionId: props.param,
      myUserName: props.nickname,
      session: undefined,
      publisher: undefined,
      subscribers: [],
      readyStatus: props.ready,
    };

    //----- mySessionId에 param.id 를 props로 받아와서 넣어주면될듯
    //----- myUserName에는 cookies.nickname 넣기

    // this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  componentDidUpdate(prevProps) {
    // console.log('-----prevProps 값', prevProps);
    // console.log('-----prevProps.ready 값', prevProps.ready);
    // console.log('-----this.state.ready 값', this.state.readyStatus);
    // console.log('-----prevProps', prevProps.nickname);
    if (this.state.readyStatus !== prevProps.ready) {
      this.setState({
        readyStatus: prevProps.ready,
      });
    }
    //readyStatus 를 보내기 위해
  }

  // joinSession() {
  componentDidMount() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---
    // console.log('*****OV 뭐야', this.OV);
    //OpenVidu에 대한 데이터들이 들어있었음
    // console.log('*****OV.initSession 뭐야', this.OV.initSession());
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;

        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          // console.log('-----subscriber!-----', subscriber);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);
          // console.log('-----subscribers-----', subscribers);
          // console.log('-----publisher-----', this.state.publisher);
          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on('exception', (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        this.getToken().then((token) => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, {
              clientData: this.state.myUserName,
              // boolkey: this.state.readyStatus,
            })
            .then(async () => {
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Obtain the current video device in use
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === 'videoinput'
              );
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: currentVideoDevice,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                'There was an error connecting to the session:',
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: '',
      myUserName: '',
      publisher: undefined,
    });
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <div>
        {this.props.gameEnd ? (
          <>
            {this.state.session !== undefined && (
              <div>
                {this.props.rtcExit && this.leaveSession()}
                <div
                  className="spyScreen"
                  style={{ width: 'calc(100% + 350px)' }}
                >
                  {/* 스파이화면 */}
                  {this.state.publisher !== undefined &&
                    JSON.parse(this.state.publisher.stream.connection.data)
                      .clientData === this.props.spy && (
                      <GameEndContents streamManager={this.state.publisher} />
                    )}
                  {this.state.subscribers.map(
                    (sub, i) =>
                      JSON.parse(sub.stream.connection.data).clientData ===
                        this.props.spy && (
                        <GameEndContents streamManager={sub} />
                      )
                  )}
                </div>
                <EndGameUsers className="endGameUsers">
                  {this.props.userCameras.map((person) => (
                    // <div className="allscreen">
                    <NoneSpyUsers className="noneSpyUsers">
                      {/* 스파이를 제외한 나머지 사람들 */}
                      {this.state.publisher !== undefined &&
                        JSON.parse(this.state.publisher.stream.connection.data)
                          .clientData === person.nickname &&
                        this.props.spy !== person.nickname && (
                          <>
                            <CameraEnd
                              streamManager={this.state.publisher}
                              // key={person.id}
                            />
                          </>
                        )}
                      {this.state.subscribers.map(
                        (sub, i) =>
                          JSON.parse(sub.stream.connection.data).clientData ===
                            person.nickname &&
                          this.props.spy !== person.nickname && (
                            <>
                              <CameraEnd
                                streamManager={sub}
                                // key={person.id}
                              />
                            </>
                          )
                      )}
                    </NoneSpyUsers>
                    // </div>
                  ))}
                </EndGameUsers>
              </div>
            )}
          </>
        ) : (
          <>
            {this.state.session !== undefined && (
              <div>
                {this.props.rtcExit && this.leaveSession()}
                <Users>
                  {this.props.userCameras.map((person) => (
                    <>
                      {this.state.publisher !== undefined &&
                        JSON.parse(this.state.publisher.stream.connection.data)
                          .clientData === person.nickname && (
                          <Camera
                            stamp={this.props.stamp}
                            setStamp={this.props.setStamp}
                            voteStatus={this.props.voteStatus}
                            setVoteStatus={this.props.setVoteStatus}
                            streamManager={this.state.publisher}
                            person={person.nickname}
                            ready={person.boolkey}
                            // key={person.id}
                          />
                        )}
                      {this.state.subscribers.map(
                        (sub, i) =>
                          JSON.parse(sub.stream.connection.data).clientData ===
                            person.nickname && (
                            <Camera
                              stamp={this.props.stamp}
                              setStamp={this.props.setStamp}
                              voteStatus={this.props.voteStatus}
                              setVoteStatus={this.props.setVoteStatus}
                              streamManager={sub}
                              person={person.nickname}
                              ready={person.boolkey}
                              // key={person.id}
                            />
                          )
                      )}
                      {person.nickname === '' && (
                        <Camera
                        // key={person.id}
                        />
                      )}
                    </>
                  ))}
                </Users>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'openvidu/api/sessions',
      { customSessionId: sessionId },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL +
        'openvidu/api/sessions/' +
        sessionId +
        '/connections',
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data; // The token
  }
}

export default OvReact;

const Users = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly; //가로 띄우기
  align-content: space-evenly; //세로 띄우기
  width: 100%;
  min-width: 880px;
  height: 50vh;
  min-height: 360px;
  margin: 1vh 0;

  .noneSpyUsers {
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;

const EndGameUsers = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  justify-content: space-evenly; //가로 띄우기
  align-content: space-evenly; //세로 띄우기
  width: calc(100% + 350px);
  min-width: 880px;
  height: 30vh;
  min-height: 240px;
  /* background-color: pink; */
  padding: 20px 0;
`;

const NoneSpyUsers = styled.div`
  /* flex-wrap: wrap; */
  /* justify-content: space-evenly; //가로 띄우기 */
  /* align-content: space-evenly; //세로 띄우기 */
  /* width: 100%; */
  /* min-width: 880px; */
  /* height: 50vh;
  min-height: 360px; */
  /* height: 300px; */
`;
