import React, { useEffect, useState } from 'react';
import { Feed, Checkbox } from 'semantic-ui-react';

export interface INft {
  name: string
  description: string
  image: { LIGHT: string, DARK: string }
  link: string
  issued_at: string
  program?: string
  cohort?: string
  owner: string
  id: string
  isAvatar: boolean
  isAvatarBadge: boolean
  source: string
  contract: string
}

interface INftProps {
  nft: INft
  isShow: boolean
  current: boolean
  avatarNftId: string | null
  handleToggleAvatar: any
  avatarNftBadgeId: string | null
  handleToggleAvatarBadge: any
  theme: 'DARK' | 'LIGHT'
}

export function Nft(props: INftProps) {
  const {
    nft,
    isShow,
    handleToggleAvatar,
    current,
    avatarNftId,
    avatarNftBadgeId,
    handleToggleAvatarBadge,
    theme,
  } = props;
  const {
    name,
    description,
    image,
    link,
    issued_at,
    program,
    cohort,
    owner,
    id,
    source,
    contract,
  } = nft;

  const [show, showOn] = useState<boolean>(false);
  const [mediaType, changeMediaType] = useState<string>('image/png');
  const [showInfo, toggleInfo] = useState<boolean>(source === 'ncd');

  useEffect(() => {
    fetch(image[theme], { method: 'HEAD' })
      .then(resp => {
        const type = resp.headers.get('Content-Type');
        type && changeMediaType(type);
        showOn(true);
      })
      .catch(err => console.log('Error fetching image.', err));
  }, []);

  return !show ? <></> : (
    <Feed.Event style={{ padding: '.6em 1em', display: isShow ? 'flex' : 'none' }} >
      <Feed.Label style={{ cursor: 'pointer', padding: '0.1rem' }} onClick={() => toggleInfo(!showInfo)}>
        {mediaType === 'application/octet-stream'
          ? <video src={image[theme]} autoPlay muted loop style={{ width: '100%' }} />
          : <img src={image[theme]} />}
      </Feed.Label>
      <Feed.Content style={{ cursor: 'pointer', opacity: showInfo ? '1' : '0' }} onClick={() => toggleInfo(!showInfo)}>
        <Feed.Summary className='nft-title'>
            <div style={{ display: 'inline-block' }}>{name}</div>
            <button
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                window.open(link, '_blank');
              }}
              className={`nft-link ${source}-icon`}
            />
        </Feed.Summary>
        <Feed.Summary style={{ fontWeight: 'normal' }}>
          <b>Description: </b>
          {description}
        </Feed.Summary>
        {program && (<Feed.Summary style={{ fontWeight: 'normal' }}>
            <b>Issued at: </b>
            {new Date(issued_at).toLocaleDateString()}
          </Feed.Summary>
        )}
        {program && (<Feed.Summary style={{ fontWeight: 'normal' }}>
            <b>Program: </b>
            {program}
          </Feed.Summary>
        )}
        {cohort && (
          <Feed.Summary style={{ fontWeight: 'normal' }}>
            <b>Cohort: </b>
            {cohort}
          </Feed.Summary>
        )}
        <Feed.Summary style={{ fontWeight: 'normal' }}>
          <b>Owner: </b>
          {owner}
        </Feed.Summary>
        {current && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            position: 'relative',
            marginTop: '1em',
          }}>
            <Feed.Summary style={{ fontWeight: 'normal' }}>
              <Checkbox
                toggle
                label='Avatar'
                checked={id === avatarNftId}
                onChange={handleToggleAvatar(id, source, contract)}
              />
            </Feed.Summary>
            <Feed.Summary style={{ fontWeight: 'normal' }}>
              <Checkbox
                toggle
                label='Badge'
                checked={id === avatarNftBadgeId}
                onChange={handleToggleAvatarBadge(id, source, contract)}
              />
            </Feed.Summary>
          </div>
        )}
      </Feed.Content>
    </Feed.Event>
  );
}
