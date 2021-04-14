import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Input, Dropdown } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

import { playlistsSelectors } from '../../../selectors/playlists';
import * as PlaylistActions from '../../../actions/playlists';
import Header from '../../Header';
import styles from './styles.scss';

type PlaylistsHeaderProps = {
  showText: boolean;
}

const sourceOptions = [
  {
    key: 'Spotify',
    text: 'Spotify',
    value: 'Spotify'
  }
];

const PlaylistsHeader: React.FC<PlaylistsHeaderProps> = ({ showText }) => {
  const { t } = useTranslation('playlists');
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [playlistSource, setPlaylistSource] = useState(sourceOptions[0].value);
  const [playlistUrl, setPlaylistUrl] = useState('');
  const isImporting = useSelector(playlistsSelectors.playlistImporting) as boolean;
  const handleImporting = useCallback(async (url, source) => {
    dispatch(PlaylistActions.importPlaylist(url, source));
  }, [dispatch]);

  return (
    <div className={styles.header_container}>
      {showText && <Header>{t('header')}</Header>}
      {!showText && <span />}

      <Modal
        trigger={<Button basic icon={'cloud download'} />}
        on='click'
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        className={styles.import_modal}
        closeOnEscape={!isImporting}
        closeOnDimmerClick={!isImporting}
      >
        <Modal.Content>
          <section className={styles.source_section}>
            <Header>{t('import')}</Header>
            <hr />
            <div className={styles.playlist_url}>
              <label>URL</label>
              <Input placeholder='URL...' value={playlistUrl} onChange={(e, data) => setPlaylistUrl(data.value)} />
            </div>

            <div>
              <label>
                {t('select-source')}
              </label>
              <Dropdown
                selection
                options={sourceOptions}
                defaultValue={sourceOptions[0].value}
                onChange={(e, data) => setPlaylistSource(data.value.toString())}
              />
            </div>
          </section>
          <Button
            color='black'
            content='Import'
            labelPosition='left'
            icon='cloud download'
            onClick={() => handleImporting(playlistUrl, playlistSource)}
            positive
            loading={isImporting}
          />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default PlaylistsHeader;
