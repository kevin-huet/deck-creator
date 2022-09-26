import {useState} from "react";
import {
    createStyles,
    ActionIcon,
    Header,
    Container,
    Group,
    Burger,
    Paper,
    Transition,
    useMantineColorScheme
} from '@mantine/core';
import {IconSun, IconMoonStars, IconLogin, IconUserPlus, IconUser} from '@tabler/icons';
import {useDisclosure} from '@mantine/hooks';
import Link from "next/link";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
    root: {
        position: 'relative',
        zIndex: 1,
    },

    dropdown: {
        position: 'absolute',
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: 'hidden',

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        [theme.fn.smallerThan('sm')]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({variant: 'light', color: theme.primaryColor}).background,
            color: theme.fn.variant({variant: 'light', color: theme.primaryColor}).color,
        },
    },
}));

interface HeaderResponsiveProps {
    links: { link: string; label: string }[];
}

export const AppBar = ({links}: HeaderResponsiveProps) => {
    const [opened, {toggle, close}] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const {classes, cx} = useStyles();
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();

    const items = links.map((link) => (
        <Link href={link.link} key={link.label}>
            <a
                key={link.label}
                className={cx(classes.link, {[classes.linkActive]: active === link.link})}
            >
                {link.label}
            </a>
        </Link>
    ));

    return (
        <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
            <Container className={classes.header}>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Group spacing={5} className={classes.links}>

                    <ActionIcon
                        onClick={() => {
                            toggleColorScheme()
                        }}
                        size="lg"
                        sx={(theme) => ({
                            backgroundColor:
                                theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                            color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6],
                        })}
                    >
                        {colorScheme === 'dark' ? <IconSun size={18}/> : <IconMoonStars size={18}/>}
                    </ActionIcon>
                    <Link href={'/auth/login'}><ActionIcon size="lg" variant="filled"><IconUser size={18}/></ActionIcon></Link>
                    <Link href={'/auth/register'}><ActionIcon size="lg" variant="filled"><IconUserPlus size={18}/></ActionIcon></Link>

                </Group>
                <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm"/>

                <Transition transition="pop-top-right" duration={200} mounted={opened}>
                    {(styles) => (
                        <Paper className={classes.dropdown} withBorder style={styles}>
                            {items}
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    );
}