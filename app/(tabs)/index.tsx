import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { Switch, Text, TextInput } from "react-native-paper";
import { useEffect, useMemo, useState } from "react";
import { TimeSpan } from "../../shared/system/timeSpan";
import { appConfig } from "../../config/appConfig";
import { Team } from "../../domain/models/team";
import { PlayerPosition } from "../../domain/models/playerPosition";
import { Player } from "../../domain/models/player";

export default function MatchTab() {
    const [matchDuration, setMatchDuration] = useState<TimeSpan | null>(TimeSpan.fromMinutes(10));

    const [teams, setTeams] = useState<Team[]>([]);

    const { matchConfig } = appConfig;

    const onPlayerNameChange = (value: string, team: Team, player: Player) => {
        setTeams((teams) => {
            const teamIndex = teams.indexOf(team);
            const playerIndex = teams[teamIndex].players.indexOf(player);

            teams[teamIndex].players[playerIndex].name = value;

            return [...teams];
        });
    }

    const onMatchDurationChange = (value: string) => {
        let minutes = parseInt(value);

        if (!value || isNaN(minutes)) {
            setMatchDuration(null);
            return;
        }

        if (minutes < matchConfig.minDurationMinutes) {
            minutes = matchConfig.minDurationMinutes;
        }

        if (minutes > matchConfig.maxDurationMinutes) {
            minutes = matchConfig.maxDurationMinutes;
        }

        setMatchDuration(TimeSpan.fromMinutes(minutes));
    }

    const maxMatchDurationInputLength = useMemo(() => {
        return matchConfig.maxDurationMinutes.toString().length;
    }, [matchConfig.maxDurationMinutes]);

    const matchDurationFormatted = useMemo(() => {
        const minutes = matchDuration?.minutes.toString();

        if (!minutes) {
            return '';
        }

        return `${minutes.toString()}`;
    }, [matchDuration?.minutes]);

    useEffect(() => {
        if (teams.length === 0) {
            const homeTeam = new Team();
            const awayTeam = new Team();

            homeTeam.players.push(new Player('', PlayerPosition.Defender));
            homeTeam.players.push(new Player('', PlayerPosition.Forward));

            awayTeam.players.push(new Player('', PlayerPosition.Defender));
            awayTeam.players.push(new Player('', PlayerPosition.Forward));

            setTeams([homeTeam, awayTeam]);
        }
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.matchSettingsView}>
                <View style={styles.matchDurationView}>
                    <TextInput mode='outlined'
                               inputMode='numeric'
                               label='Weddstrijduur'
                               maxLength={maxMatchDurationInputLength}
                               right={<TextInput.Affix text=' minuten'/>}
                               style={styles.textInput}
                               value={matchDurationFormatted}
                               onChange={(e) => onMatchDurationChange(e.nativeEvent.text)}/>
                </View>
                <View style={styles.switchView}>
                    {/* TODO | 0.3 */}
                    {/*<Text>Speel met tweede helft</Text>*/}
                    {/*<Switch value={isHalfTimeEnabled} onValueChange={setIsHalfTimeEnabled}/>*/}
                </View>
            </View>
            <Text variant='headlineMedium' style={styles.h2}>Teams</Text>
            <View style={styles.teamSettingsView}>
                {teams.map((team, teamIndex) =>
                    <View style={styles.teamView}>
                        <Text>Team {teamIndex}</Text>
                        {team.players.map((player) =>
                            <View style={styles.playerView}>
                                <TextInput mode='outlined'
                                           inputMode='text'
                                           key={player.position}
                                           label={player.position === PlayerPosition.Defender ? 'Verdediger' : 'Aanvaller'}
                                           style={styles.textInput}
                                           onChange={(e) => onPlayerNameChange(e.nativeEvent.text, team, player)}/>
                            </View>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
}

const playerGap = 16;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
    },
    h2: {
        marginBottom: 16,
    },
    matchSettingsView: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    teamSettingsView: {
        display: "flex",
        // flexDirection: 'column',
        marginBottom: 32,
        gap: 32,
    },
    teamView: {
        // flexDirection: 'row',
        gap: 8,
    },
    playerView: {
    },
    matchDurationView: {
        flex: 0,
    },
    switchView: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    textInput: {}
});
