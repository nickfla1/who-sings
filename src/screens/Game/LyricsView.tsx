import {ChoiceButton, LyricsCard, SkipButton} from '@components/screens/game';
import {TrackArtist} from '@core/domain/track/TrackArtist';
import {TrackLyricsSnippet} from '@core/domain/track/TrackLyricsSnippet';
import {HugeText} from '@ui';
import React, {FC} from 'react';
import {View} from 'react-native';
import {ScaledSheet} from 'react-native-size-matters';

interface Props {
  lyrics: TrackLyricsSnippet;
  choices: TrackArtist[];
  onSkip: () => void;
  onTimeOut: () => void;
  onChoose: (choice: TrackArtist) => void;
  trackNumber: number;
  totalTracks: number;
}

export const LyricsView: FC<Props> = ({
  lyrics,
  onSkip,
  choices,
  onTimeOut,
  onChoose,
  totalTracks,
  trackNumber,
}) => (
  <>
    {/* Title */}
    <HugeText style={Style.title} bold italic colorWhite>
      Who Sings ...
    </HugeText>
    {/* Lyrics card */}
    <View style={Style.cardContainer}>
      <LyricsCard
        lyrics={lyrics}
        trackNumber={trackNumber}
        totalTracks={totalTracks}
        onTimeOut={onTimeOut}
      />
    </View>
    {/* Choices list */}
    <View style={Style.list}>
      {choices &&
        choices.map((choice) => (
          <View key={choice.name} style={Style.choiceContainer}>
            <ChoiceButton onPress={(): void => onChoose(choice)}>
              {choice.name}
            </ChoiceButton>
          </View>
        ))}
    </View>
    {/* Skip CTA */}
    <SkipButton onPress={onSkip} />
  </>
);

const Style = ScaledSheet.create({
  title: {
    marginBottom: '30@vs',
  },
  cardContainer: {
    marginBottom: '30@vs',
    width: '100%',
  },
  // List
  list: {
    width: '100%',
    flexDirection: 'column',

    // opt
    marginTop: '10@vs',
  },
  choiceContainer: {
    marginBottom: '10@vs',
  },
});
