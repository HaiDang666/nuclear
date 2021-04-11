import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Input, Dropdown } from 'semantic-ui-react';

import Header from '../../Header';
import styles from './styles.scss';

type PlaylistsHeaderProps = {
  showText: boolean;
}

const friendOptions = [
  {
    key: 'Youtube',
    text: 'Youtube',
    value: 'Youtube'
  },
  {
    key: 'Playlist',
    text: 'Playlist',
    value: 'Playlist'
  }
];

const PlaylistsHeader: React.FC<PlaylistsHeaderProps> = ({ showText }) => {
  const { t } = useTranslation('playlists');
  const [isOpen, setIsOpen] = useState(false);

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
      >
        <Modal.Content>
          <section className={styles.source_section}>
            <Header>{t('import')}</Header>
            <hr />
            <div className={styles.playlist_url}>
              <label>URL</label>
              <Input placeholder='URL...' />
            </div>

            <div>
              <label>
                {t('select-source')}
              </label>
              <Dropdown
                selection
                options={friendOptions}
                defaultValue={friendOptions[0].value}
                onChange={() => { }}
              />
            </div>
          </section>
          <Button
            color='black'
            content='Import'
            labelPosition='left'
            icon='cloud download'
            onClick={() => setIsOpen(false)}
            positive
          />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default PlaylistsHeader;
