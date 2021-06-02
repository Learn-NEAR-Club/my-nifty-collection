import React from 'react';
import { Feed, Ref, Checkbox } from 'semantic-ui-react';

export interface INft {
  name: string;
  description: string;
  image: { LIGHT: string };
  link: string;
  issued_at: string;
  program: string;
  cohort: string;
  owner: string;
  id: string;
  isAvatar: boolean;
}

interface INftProps {
  nft: INft;
  i: number;
  refs: any;
  index?: number;
  handleToggleAvatar: any;
  current: boolean;
  avatarNftId: string | null;
}

export function Nft(props: INftProps) {
  const { nft, i, index, refs, handleToggleAvatar, current, avatarNftId } = props;
  const { name, description, image, link, issued_at, program, cohort, owner, id } = nft;
  return (
    <Ref innerRef={refs[`nft_${i}`]}>
      <Feed.Event
        style={{
          padding: '.6em 1em',
          backgroundColor: `${i === index ? 'hsl(185deg 19% 43% / 10%)' : 'inherit'}`,
        }}
      >
        <Feed.Label image={image.LIGHT} />
        <Feed.Content>
          <Feed.Summary>{name}</Feed.Summary>
          <Feed.Summary style={{ fontWeight: 'normal' }}>
            <b>Description: </b>
            {description}
          </Feed.Summary>
          <Feed.Summary style={{ fontWeight: 'normal' }}>
            <b>Link: </b>
            <a href={link} target="_blank" rel="noreferrer">
              View NFT
            </a>
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
            <Feed.Summary style={{ fontWeight: 'normal' }}>
              <Checkbox slider label='Avatar' checked={id === avatarNftId} onChange={handleToggleAvatar(id)} />
            </Feed.Summary>
          )}
        </Feed.Content>
      </Feed.Event>
    </Ref>
  );
}
