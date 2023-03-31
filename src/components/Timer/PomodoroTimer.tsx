import React, { useState, useEffect } from "react";
import { Box, Button, Heading, IconButton, Text, Tooltip, useColorModeValue, useToast } from "@chakra-ui/react";
import { GiSoundOn, GiSoundOff } from "react-icons/gi";
import { RxReset } from "react-icons/rx";
import { BsPauseCircleFill, BsFillPlayCircleFill } from "react-icons/bs";
import { useToastTemplate } from "../../hooks/useToastTemplate";

const PomodoroTimer = () => {
	const [timerState, setTimerState] = useState({
		isRunning: false, // タイマーが実行中かどうかを表すフラグ
		isWorking: true, // 作業中かどうかを表すフラグ
		workTime: 25 * 60, // 作業時間（秒数）
		breakTime: 5 * 60, // 休憩時間（秒数）
		timeLeft: 25 * 60 // 残り時間（秒数）
	});
	const [alarmState, setAlarmState] = useState({
		isOn: false, // アラームが鳴っているかどうかを表すフラグ
		audio: new Audio("/fromNewWorld.mp3") // アラーム音を表すAudioオブジェクト
	});

	const startTimer = () => {
		setTimerState((prevState) => ({ ...prevState, isRunning: true }));
	};

	const stopTimer = () => {
		setTimerState((prevState) => ({ ...prevState, isRunning: false }));
	};

	useEffect(() => {
		let interval = null;
		// タイマーが実行中の場合、1秒ごとにtimeLeftを1減らす
		if (timerState.isRunning) {
			interval = setInterval(() => {
				setTimerState((prevState) => ({
					...prevState,
					timeLeft: prevState.timeLeft - 1
				}));
			}, 1000);
		} else {
			clearInterval(interval); // タイマーが実行されていない場合はintervalをクリアする
		}

		return () => clearInterval(interval); // cleanup関数でintervalをクリアする
	}, [timerState.isRunning]);

	useEffect(() => {
		// タイマーが0になった場合
		if (timerState.timeLeft === 0) {
			// isWorkingを反転させ、次の時間をtimeLeftに設定する
			setTimerState((prevState) => ({
				...prevState,
				isWorking: !prevState.isWorking,
				timeLeft: prevState.isWorking ? prevState.breakTime : prevState.workTime
			}));
			setAlarmState((prevState) => {
				// アラームがONの場合、音声を再生する
				if (prevState.isOn) {
					prevState.audio.play();
				}
				return prevState;
			});
			showEndMessage();
		}
	}, [timerState.timeLeft]);

	// タイマーの状態を初期値に戻す
	const resetTimer = () => {
		setTimerState((prevState) => ({
			...prevState,
			isRunning: false,
			isWorking: true,
			timeLeft: prevState.workTime
		}));
		// アラームがONの場合、音声を停止し、再生位置を最初に戻す
		setAlarmState((prevState) => {
			if (prevState.isOn) {
				prevState.audio.pause();
				prevState.audio.currentTime = 0;
			}
			return prevState;
		});
	};

	const toggleAlarm = () => {
		// AlarmをONにする場合、prevStateのaudioを再生し、toastでメッセージを表示する
		setAlarmState((prevState) => {
			if (!prevState.isOn) {
				prevState.audio.loop = true;
				prevState.audio.play();
				showToast("Alarm is on");
				// AlarmをOFFにする場合、prevStateのaudioを停止し、toastでメッセージを表示する
			} else {
				prevState.audio.pause();
				prevState.audio.currentTime = 0;
				showToast("Alarm is off");
			}
			// Alarmの状態を反転させる
			return { ...prevState, isOn: !prevState.isOn };
		});
	};
	// 画面にToastを表示するための関数
	const { praimaryInfoToast } = useToastTemplate();
	const showToast = (message: string) => {
		praimaryInfoToast(message);
	};
	const showEndMessage = () => {
		if (!alarmState.isOn) {
			showToast(timerState.isWorking ? "Work Complete!" : "Break Complete!");
		}
	};

	// timerStateから必要な値を取得する
	const { isRunning, isWorking, timeLeft } = timerState;
	// 残り時間を分単位と秒単位に変換する
	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft - minutes * 60;

	const bg = useColorModeValue("gray.300", "gray.700");
	const textColor = useColorModeValue("gray.800", "white");

	return (
		<Box p={8} bg={bg}>
			<Heading mb={2} size="lg" textAlign="center" color={textColor}>
				{isWorking ? "Writing Time" : "Breaking Time"}
			</Heading>

			<Text fontSize="3xl" textAlign="center" color={textColor} mb={8} fontWeight={"bold"}>
				{`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
			</Text>

			<Box display="flex" justifyContent="center" alignItems="center">
				<Tooltip label={"スタートタイマー"} placement={"right-end"}>
					<IconButton
						aria-label="startTimer"
						icon={<BsFillPlayCircleFill />}
						variant="ghost"
						colorScheme={"teal"}
						fontSize="24px"
						boxSize={10}
						onClick={startTimer}
					/>
				</Tooltip>
				<Tooltip label={"タイマーストップ"} placement={"right-end"}>
					<IconButton
						aria-label="stopTimer"
						icon={<BsPauseCircleFill />}
						variant="ghost"
						colorScheme={"red"}
						fontSize="24px"
						boxSize={10}
						onClick={stopTimer}
					/>
				</Tooltip>
				<Tooltip label={"タイマーリセット"} placement={"right-end"}>
					<IconButton
						aria-label="resetTimer"
						icon={<RxReset />}
						variant="ghost"
						colorScheme={"blackAlpha"}
						fontSize="24px"
						boxSize={10}
						onClick={resetTimer}
					/>
				</Tooltip>
				<Tooltip label={alarmState.isOn ? "現在アラームがON状態" : "現在アラームがOff状態"} placement={"right-end"}>
					<IconButton
						aria-label="alarm"
						icon={alarmState.isOn ? <GiSoundOn /> : <GiSoundOff />}
						variant="ghost"
						colorScheme={alarmState.isOn ? "telegram" : "gray"}
						fontSize="24px"
						boxSize={10}
						onClick={toggleAlarm}
					/>
				</Tooltip>
			</Box>
		</Box>
	);
};

export default PomodoroTimer;
