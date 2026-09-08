import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, SUPABASE_CONFIGURED } from './config.js';

export const sb = SUPABASE_CONFIGURED ? createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) : null;
export { SUPABASE_CONFIGURED };

export const menuItems = [
  {
    id: 'original-recipe-plate',
    name: 'Original Recipe Plate',
    category: 'Buckets & Plates',
    description: 'Two pieces, slaw, and a biscuit. The classic baseline for everything we do.',
    price: 10,
  },
  {
    id: 'nashville-hot-half-bird',
    name: 'Nashville Hot Half Bird',
    category: 'Buckets & Plates',
    description: 'Cayenne-lacquered, served on white bread with pickles.',
    price: 13,
    featured: true,
  },
  {
    id: 'family-bucket',
    name: 'Family Bucket',
    category: 'Buckets & Plates',
    description: '12 pieces, two large sides, four biscuits.',
    price: 34,
  },
  {
    id: 'crispy-chicken-sandwich',
    name: 'Crispy Chicken Sandwich',
    category: 'Handhelds',
    description: 'Pickles, mustard slaw, toasted bun, and a very loud crunch.',
    price: 8,
  },
  {
    id: 'waffle-wrap',
    name: 'Waffle Wrap',
    category: 'Handhelds',
    description: 'Tenders, syrup butter, folded in a waffle.',
    price: 9,
  },
  {
    id: 'mac-and-cheese',
    name: 'Mac & Cheese',
    category: 'Sides',
    description: 'Creamy, baked, and finished with a crisp top.',
    price: 4,
  },
  {
    id: 'buttermilk-biscuit',
    name: 'Buttermilk Biscuit',
    category: 'Sides',
    description: 'Flaky, warm, and built for soaking up hot sauce.',
    price: 3,
  },
  {
    id: 'vinegar-slaw',
    name: 'Vinegar Slaw',
    category: 'Sides',
    description: 'Bright, sharp, and made to cut through the heat.',
    price: 3,
  },
  {
    id: 'loaded-fries',
    name: 'Loaded Fries',
    category: 'Sides',
    description: 'Seasoned fries with chicken bits, sauce, and cheese.',
    price: 6,
  },
  {
    id: 'sweet-tea',
    name: 'Sweet Tea',
    category: 'Drinks',
    description: 'Cold, sweet, and brewed for long summer lines.',
    price: 3,
  },
  {
    id: 'fresh-lemonade',
    name: 'Fresh Lemonade',
    category: 'Drinks',
    description: 'Tart enough to reset your taste buds.',
    price: 3,
  },
  {
    id: 'bottled-water',
    name: 'Bottled Water',
    category: 'Drinks',
    description: 'A calm ending to a loud meal.',
    price: 2,
  },
];

export const faqItems = [
  ['Do you cater private events?', 'Yes. Booking requests are the best way to share event details, guest count, and timing.'],
  ['How far does the truck travel?', 'We rotate neighborhood stops and private event stops based on the published schedule.'],
  ['How early should I book?', 'The earlier the better. Large private events should be submitted as soon as your date is set.'],
  ['Do you accept large orders?', 'Yes. Add everything to the cart, then submit the checkout flow so we can confirm availability.'],
  ['Where is the truck today?', 'Check the truck status section on the home page for today’s published location and schedule.'],
];

export const statusMeta = {
  pending: {
    label: 'Pending',
    tone: 'pending',
    description: 'Request received and waiting for review.',
  },
  under_review: {
    label: 'Under Review',
    tone: 'review',
    description: 'We are checking staffing and route availability.',
  },
  confirmed: {
    label: 'Confirmed',
    tone: 'confirmed',
    description: 'This booking or order has been accepted.',
  },
  rejected: {
    label: 'Rejected',
    tone: 'rejected',
    description: 'We could not accommodate the request.',
  },
  completed: {
    label: 'Completed',
    tone: 'completed',
    description: 'Service finished successfully.',
  },
};

export const truckStatusMeta = {
  open: { label: 'Open', tone: 'confirmed' },
  closed: { label: 'Closed', tone: 'rejected' },
  opening_soon: { label: 'Opening Soon', tone: 'review' },
};

const CART_KEY = 'cow-cart-v2';
const toastTimers = new Set();

function getStoredCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function setStoredCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  emitCartChange();
}

function emitCartChange() {
  const event = new CustomEvent('cow:cart-change', { detail: getCartState() });
  window.dispatchEvent(event);
}

export function getMenuItem(id) {
  return menuItems.find((item) => item.id === id) || null;
}

export function formatMoney(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDateLabel(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatTimeLabel(value) {
  if (!value) return '';
  const [hours, minutes] = String(value).split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return String(value);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }[character]));
}

export function normalizeStatus(status) {
  return status === 'accepted' ? 'confirmed' : status;
}

export function getCartState() {
  const items = getStoredCart().map((entry) => {
    const menuItem = getMenuItem(entry.id);
    if (!menuItem) {
      return null;
    }
    const quantity = Math.max(1, Number(entry.quantity) || 1);
    const lineTotal = quantity * menuItem.price;
    return {
      ...menuItem,
      quantity,
      lineTotal,
    };
  }).filter(Boolean);

  const subtotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
  return {
    items,
    count: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal,
    total: subtotal,
  };
}

export function addToCart(itemId, quantity = 1) {
  const cart = getStoredCart();
  const index = cart.findIndex((entry) => entry.id === itemId);
  const nextQuantity = Math.max(1, Number(quantity) || 1);
  if (index >= 0) {
    cart[index].quantity = Math.max(1, (Number(cart[index].quantity) || 1) + nextQuantity);
  } else {
    cart.push({ id: itemId, quantity: nextQuantity });
  }
  setStoredCart(cart);
}

export function setCartItemQuantity(itemId, quantity) {
  const cart = getStoredCart();
  const nextQuantity = Math.max(1, Number(quantity) || 1);
  const index = cart.findIndex((entry) => entry.id === itemId);
  if (index >= 0) {
    cart[index].quantity = nextQuantity;
    setStoredCart(cart);
  }
}

export function removeCartItem(itemId) {
  setStoredCart(getStoredCart().filter((entry) => entry.id !== itemId));
}

export function clearCart() {
  setStoredCart([]);
}

export function subscribeCart(listener) {
  const handler = () => listener(getCartState());
  window.addEventListener('cow:cart-change', handler);
  listener(getCartState());
  return () => window.removeEventListener('cow:cart-change', handler);
}

export function showToast(message, kind = 'success') {
  const region = document.getElementById('toast-region') || ensureToastRegion();
  const toast = document.createElement('div');
  toast.className = `toast toast--${kind}`;
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `<span>${escapeHtml(message)}</span>`;
  region.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('is-visible'));

  const timer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
    window.setTimeout(() => toast.remove(), 260);
    toastTimers.delete(timer);
  }, 2600);
  toastTimers.add(timer);
}

function ensureToastRegion() {
  const region = document.createElement('div');
  region.id = 'toast-region';
  region.className = 'toast-region';
  document.body.appendChild(region);
  return region;
}

export function getModalElements() {
  return {
    itemModal: document.getElementById('item-modal'),
    itemModalTitle: document.getElementById('item-modal-title'),
    itemModalBody: document.getElementById('item-modal-body'),
    cartDrawer: document.getElementById('cart-drawer'),
    cartDrawerBackdrop: document.getElementById('cart-drawer-backdrop'),
    cartDrawerBody: document.getElementById('cart-drawer-body'),
    checkoutModal: document.getElementById('checkout-modal'),
    checkoutModalBody: document.getElementById('checkout-modal-body'),
  };
}

export function openPanel(panel) {
  if (!panel) return;
  panel.hidden = false;
  requestAnimationFrame(() => {
    panel.classList.add('is-open');
  });
  document.body.classList.add('no-scroll');
}

export function closePanel(panel) {
  if (!panel) return;
  panel.classList.remove('is-open');
  window.setTimeout(() => {
    panel.hidden = true;
    if (!document.querySelector('.modal.is-open, .drawer.is-open')) {
      document.body.classList.remove('no-scroll');
    }
  }, 220);
}

export function openItemModal(item) {
  const { itemModal, itemModalTitle, itemModalBody } = getModalElements();
  if (!itemModal || !itemModalTitle || !itemModalBody || !item) return;
  itemModalTitle.textContent = item.name;
  itemModalBody.innerHTML = `
    <div class="modal-grid">
      <div>
        <p class="eyebrow">Menu item</p>
        <p class="modal-copy">${escapeHtml(item.description)}</p>
      </div>
      <div class="modal-summary">
        <div><span>Category</span><strong>${escapeHtml(item.category)}</strong></div>
        <div><span>Price</span><strong>${formatMoney(item.price)}</strong></div>
        <div><span>Quantity</span>
          <div class="quantity-picker" data-quantity-picker>
            <button type="button" class="icon-button" data-qty-minus aria-label="Decrease quantity">−</button>
            <input type="number" min="1" value="1" aria-label="Quantity" data-modal-qty>
            <button type="button" class="icon-button" data-qty-plus aria-label="Increase quantity">+</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-actions">
      <button type="button" class="btn btn--ghost" data-close-panel>Cancel</button>
      <button type="button" class="btn btn--gold" data-add-to-cart="${escapeHtml(item.id)}">Add to Order</button>
    </div>
  `;
  openPanel(itemModal);
}

export function renderCartDrawer(cartRoot) {
  if (!cartRoot) return;
  const { items, subtotal, total, count } = getCartState();
  if (!items.length) {
    cartRoot.innerHTML = `
      <div class="empty-state">
        <h3>Your cart is empty</h3>
        <p>Add a plate, side, or drink from the menu to start building your order.</p>
      </div>
    `;
    return;
  }

  cartRoot.innerHTML = `
    <div class="cart-summary">
      <div><span class="muted">Items</span><strong>${count}</strong></div>
      <div><span class="muted">Subtotal</span><strong>${formatMoney(subtotal)}</strong></div>
    </div>
    <div class="cart-items">
      ${items.map((item) => `
        <article class="cart-item" data-cart-item="${escapeHtml(item.id)}">
          <div class="cart-item-copy">
            <h4>${escapeHtml(item.name)}</h4>
            <p>${escapeHtml(item.category)} · ${formatMoney(item.price)} each</p>
          </div>
          <div class="cart-item-controls">
            <div class="quantity-picker quantity-picker--compact">
              <button type="button" class="icon-button" data-cart-decrement aria-label="Decrease quantity">−</button>
              <input type="number" min="1" value="${item.quantity}" data-cart-qty aria-label="Quantity">
              <button type="button" class="icon-button" data-cart-increment aria-label="Increase quantity">+</button>
            </div>
            <div class="cart-item-meta">
              <strong>${formatMoney(item.lineTotal)}</strong>
              <button type="button" class="link-button" data-cart-remove>Remove</button>
            </div>
          </div>
        </article>
      `).join('')}
    </div>
    <div class="cart-total">
      <div><span>Subtotal</span><strong>${formatMoney(subtotal)}</strong></div>
      <div><span>Total</span><strong>${formatMoney(total)}</strong></div>
    </div>
  `;
}

export function renderMenuList(container, onItemClick) {
  if (!container) return;
  const grouped = groupMenuByCategory();
  container.innerHTML = Object.entries(grouped).map(([category, items]) => `
    <div class="menu-category">
      <h3>${escapeHtml(category)}</h3>
      <div class="menu-grid">
        ${items.map((item) => `
          <button type="button" class="menu-card" data-menu-item="${escapeHtml(item.id)}">
            <div class="menu-card-top">
              <span class="menu-card-pill">${escapeHtml(item.category)}</span>
              <span class="menu-card-price">${formatMoney(item.price)}</span>
            </div>
            <h4>${escapeHtml(item.name)}</h4>
            <p>${escapeHtml(item.description)}</p>
            <span class="menu-card-action">View details</span>
          </button>
        `).join('')}
      </div>
    </div>
  `).join('');

  container.querySelectorAll('[data-menu-item]').forEach((button) => {
    button.addEventListener('click', () => onItemClick(getMenuItem(button.dataset.menuItem)));
  });
}

export function renderSpecialCard(container, onItemClick) {
  if (!container) return;
  const item = menuItems.find((menuItem) => menuItem.featured) || menuItems.find((menuItem) => menuItem.name.includes('Nashville'));
  if (!item) return;
  container.innerHTML = `
    <button type="button" class="special-card" data-special-item="${escapeHtml(item.id)}">
      <span class="eyebrow">Today’s Special</span>
      <h3>${escapeHtml(item.name)}</h3>
      <p>${escapeHtml(item.description)}</p>
      <div class="special-card-footer">
        <strong>${formatMoney(item.price)}</strong>
        <span>Tap for details</span>
      </div>
    </button>
  `;
  container.querySelector('[data-special-item]')?.addEventListener('click', () => onItemClick(item));
}

export function renderFaq(container) {
  if (!container) return;
  container.innerHTML = faqItems.map(([question, answer], index) => `
    <details class="faq-item" ${index === 0 ? 'open' : ''}>
      <summary>${escapeHtml(question)}</summary>
      <p>${escapeHtml(answer)}</p>
    </details>
  `).join('');
}

export function renderReviews(container, reviews) {
  if (!container) return;
  if (!reviews.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No reviews yet</h3>
        <p>Once customer reviews exist in Supabase, they will show up here automatically.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="review-grid">
      ${reviews.map((review) => `
        <article class="review-card">
          <div class="review-card-top">
            <strong>${escapeHtml(review.reviewer_name)}</strong>
            <span>${'★'.repeat(Math.max(1, Math.min(5, Number(review.rating) || 0)))}</span>
          </div>
          <p>${escapeHtml(review.quote)}</p>
          ${review.source ? `<small>${escapeHtml(review.source)}</small>` : ''}
        </article>
      `).join('')}
    </div>
  `;
}

export function groupMenuByCategory() {
  return menuItems.reduce((groups, item) => {
    const list = groups[item.category] || [];
    list.push(item);
    groups[item.category] = list;
    return groups;
  }, {});
}

export async function getCurrentUser() {
  if (!sb) {
    return null;
  }
  const { data, error } = await sb.auth.getUser();
  if (error) {
    throw error;
  }
  return data.user || null;
}

export async function getCurrentProfile(userId) {
  if (!sb) return null;
  const { data, error } = await sb.from('profiles').select('name, email, role').eq('id', userId).maybeSingle();
  if (error) throw error;
  return data || null;
}

export async function loadTruckSchedule() {
  if (!sb) return { today: null, upcoming: [], reviews: [] };

  const todayDate = new Date();
  const todayKey = todayDate.toLocaleDateString('en-CA');
  const [{ data: schedule, error: scheduleError }, { data: reviews, error: reviewsError }] = await Promise.all([
    sb.from('truck_schedule').select('*').order('service_date', { ascending: true }),
    sb.from('reviews').select('*').order('created_at', { ascending: false }).limit(6),
  ]);

  if (scheduleError) throw scheduleError;
  if (reviewsError) throw reviewsError;

  const today = schedule?.find((entry) => entry.service_date === todayKey) || null;
  const upcoming = (schedule || []).filter((entry) => entry.service_date > todayKey).slice(0, 5);
  return { today, upcoming, reviews: reviews || [] };
}

export async function loadDashboardData(userId) {
  if (!sb) return { bookings: [], orders: [], profile: null };
  const [{ data: bookings, error: bookingsError }, { data: orders, error: ordersError }, profile] = await Promise.all([
    sb.from('booking_requests').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    sb.from('orders').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
    getCurrentProfile(userId),
  ]);

  if (bookingsError) throw bookingsError;
  if (ordersError) throw ordersError;

  return {
    bookings: bookings || [],
    orders: orders || [],
    profile,
  };
}

export function bookingStatusSteps(status) {
  const sequence = ['pending', 'under_review', 'confirmed', 'completed'];
  const activeIndex = sequence.indexOf(normalizeStatus(status));
  return sequence.map((step, index) => ({
    key: step,
    label: statusMeta[step].label,
    state: index < activeIndex ? 'complete' : index === activeIndex ? 'current' : 'upcoming',
  }));
}

export function renderBookingTimeline(status) {
  const steps = ['pending', 'under_review', 'confirmed', 'completed'];
  const currentIndex = steps.indexOf(normalizeStatus(status));
  return `
    <div class="timeline">
      ${steps.map((step, index) => `
        <div class="timeline-step ${index <= currentIndex ? 'is-active' : ''}">
          <span class="timeline-dot"></span>
          <div>
            <strong>${statusMeta[step].label}</strong>
            <p>${escapeHtml(statusMeta[step].description)}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

export function renderTruckStatusSection(container, scheduleData) {
  if (!container) return;
  const { today, upcoming } = scheduleData;
  const todayStatus = (today && truckStatusMeta[today.status]) || truckStatusMeta.opening_soon;
  container.innerHTML = `
    <div class="truck-status-card">
      <div class="truck-status-header">
        <div>
          <span class="eyebrow">Our Truck</span>
          <h3>Current status</h3>
        </div>
        <span class="status-pill status-pill--${todayStatus.tone}">${todayStatus.label}</span>
      </div>
      ${today ? `
        <p class="truck-location">${escapeHtml(today.location_name)}</p>
        <p class="muted">${escapeHtml(today.address || '')}</p>
        ${today.schedule ? `<p class="truck-schedule">${escapeHtml(today.schedule)}</p>` : ''}
        <div class="truck-actions">
          ${today.directions_url ? `<a class="btn btn--gold" href="${escapeHtml(today.directions_url)}" target="_blank" rel="noreferrer">Get Directions</a>` : ''}
          ${today.map_embed_url ? `<a class="btn btn--ghost" href="#truck-map">View Map</a>` : ''}
        </div>
      ` : `
        <p class="truck-location">Today's location has not been published yet.</p>
        <p class="muted">Check back for a live schedule update in Supabase.</p>
      `}
    </div>
    <div class="schedule-list">
      <h4>Today's schedule</h4>
      ${today?.schedule ? `<p>${escapeHtml(today.schedule)}</p>` : '<p class="muted">No schedule details published yet.</p>'}
      <h4>Upcoming locations</h4>
      ${upcoming.length ? `
        <div class="upcoming-list">
          ${upcoming.map((entry) => `
            <article class="upcoming-item">
              <strong>${formatDateLabel(entry.service_date)}</strong>
              <span>${escapeHtml(entry.location_name)}</span>
              <small>${escapeHtml(entry.address || '')}</small>
            </article>
          `).join('')}
        </div>
      ` : '<p class="muted">No upcoming locations are scheduled yet.</p>'}
    </div>
  `;
}

export function renderDashboardCards(container, data) {
  if (!container) return;
  const { bookings, orders, profile } = data;
  const upcomingBookings = bookings.filter((booking) => !['rejected', 'completed'].includes(normalizeStatus(booking.status)));
  const recentOrders = orders.slice(0, 3);
  const totalSpent = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  const notifications = [
    ...bookings.filter((booking) => ['pending', 'under_review'].includes(normalizeStatus(booking.status))).map((booking) => ({
      title: `Booking ${statusMeta[normalizeStatus(booking.status)].label.toLowerCase()}`,
      body: `${formatDateLabel(booking.event_date)} · ${booking.location}`,
    })),
    ...orders.filter((order) => normalizeStatus(order.status) === 'pending').map((order) => ({
      title: 'Order pending',
      body: `${order.item_count} item${order.item_count === 1 ? '' : 's'} · ${formatMoney(Number(order.total) || 0)}`,
    })),
  ].slice(0, 4);

  container.innerHTML = `
    <section class="dashboard-grid">
      <article class="dashboard-card dashboard-card--wide">
        <div class="section-head section-head--compact">
          <div>
            <span class="eyebrow">Account</span>
            <h2>${escapeHtml(profile?.name || 'Your dashboard')}</h2>
          </div>
          <p class="muted">${escapeHtml(profile?.email || '')}</p>
        </div>
        <div class="account-grid">
          <div><span class="muted">Role</span><strong>${escapeHtml(profile?.role || 'user')}</strong></div>
          <div><span class="muted">Upcoming bookings</span><strong>${upcomingBookings.length}</strong></div>
          <div><span class="muted">Recent orders</span><strong>${orders.length}</strong></div>
          <div><span class="muted">Order total</span><strong>${formatMoney(totalSpent)}</strong></div>
        </div>
      </article>

      <article class="dashboard-card">
        <h3>Notifications</h3>
        ${notifications.length ? `
          <div class="notification-list">
            ${notifications.map((note) => `
              <div class="notification-item">
                <strong>${escapeHtml(note.title)}</strong>
                <p>${escapeHtml(note.body)}</p>
              </div>
            `).join('')}
          </div>
        ` : '<p class="muted">No notifications right now.</p>'}
      </article>

      <article class="dashboard-card">
        <h3>Upcoming bookings</h3>
        ${upcomingBookings.length ? upcomingBookings.map((booking) => `
          <div class="dashboard-row">
            <div>
              <strong>${formatDateLabel(booking.event_date)}</strong>
              <p>${escapeHtml(booking.event_type || 'Booking')} · ${escapeHtml(booking.location)}</p>
            </div>
            <span class="status-pill status-pill--${statusMeta[normalizeStatus(booking.status)]?.tone || 'review'}">${escapeHtml(statusMeta[normalizeStatus(booking.status)]?.label || booking.status)}</span>
          </div>
          ${renderBookingTimeline(booking.status)}
        `).join('') : '<p class="muted">No upcoming bookings yet.</p>'}
      </article>

      <article class="dashboard-card">
        <h3>Recent orders</h3>
        ${recentOrders.length ? recentOrders.map((order) => `
          <div class="dashboard-row">
            <div>
              <strong>${formatDateLabel(order.created_at)}</strong>
              <p>${order.item_count} item${order.item_count === 1 ? '' : 's'} · ${formatMoney(Number(order.total) || 0)}</p>
            </div>
            <span class="status-pill status-pill--${statusMeta[normalizeStatus(order.status)]?.tone || 'review'}">${escapeHtml(statusMeta[normalizeStatus(order.status)]?.label || order.status)}</span>
          </div>
        `).join('') : '<p class="muted">No orders yet. Use the cart from the home page to place your first order.</p>'}
      </article>
    </section>
  `;
}

export function renderBookingHistory(container, bookings) {
  if (!container) return;
  if (!bookings.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No bookings yet</h3>
        <p>Submit a booking request from the home page to see the status timeline here.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = bookings.map((booking) => `
    <article class="booking-card">
      <div class="booking-card-top">
        <div>
          <span class="muted">${formatDateLabel(booking.event_date)}${booking.event_time ? ` · ${formatTimeLabel(booking.event_time)}` : ''}</span>
          <h3>${escapeHtml(booking.event_type || 'Booking request')}</h3>
        </div>
        <span class="status-pill status-pill--${statusMeta[normalizeStatus(booking.status)]?.tone || 'review'}">${escapeHtml(statusMeta[normalizeStatus(booking.status)]?.label || booking.status)}</span>
      </div>
      <p>${escapeHtml(booking.location)}</p>
      <p class="muted">${escapeHtml(booking.details || 'No additional details provided.')}</p>
      ${booking.admin_note ? `<div class="booking-note">Admin note: ${escapeHtml(booking.admin_note)}</div>` : ''}
      ${renderBookingTimeline(booking.status)}
    </article>
  `).join('');
}

export function renderOrdersList(container, orders) {
  if (!container) return;
  if (!orders.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No recent orders</h3>
        <p>Place an order from the menu and it will appear here after checkout.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = orders.map((order) => `
    <article class="order-card">
      <div class="booking-card-top">
        <div>
          <span class="muted">${formatDateLabel(order.created_at)}</span>
          <h3>Order #${escapeHtml(String(order.id))}</h3>
        </div>
        <span class="status-pill status-pill--${statusMeta[normalizeStatus(order.status)]?.tone || 'review'}">${escapeHtml(statusMeta[normalizeStatus(order.status)]?.label || order.status)}</span>
      </div>
      <p>${order.item_count} item${order.item_count === 1 ? '' : 's'} · ${formatMoney(Number(order.subtotal) || 0)}</p>
      <p class="muted">${(Array.isArray(order.items) ? order.items : []).map((item) => `${item.quantity}× ${item.name}`).join(', ')}</p>
    </article>
  `).join('');
}

export function renderTruckMap(container, truck) {
  if (!container) return;
  if (!truck || !truck.map_embed_url) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Map unavailable</h3>
        <p>Add a map embed URL to the truck schedule row in Supabase to show the live stop here.</p>
      </div>
    `;
    return;
  }
  container.innerHTML = `
    <iframe
      title="Truck location map"
      src="${escapeHtml(truck.map_embed_url)}"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  `;
}

export function setLoadingState(container, label = 'Loading…') {
  if (!container) return;
  container.innerHTML = `
    <div class="skeleton-block">
      <div class="skeleton-line skeleton-line--wide"></div>
      <div class="skeleton-line"></div>
      <div class="skeleton-line skeleton-line--short"></div>
      <p>${escapeHtml(label)}</p>
    </div>
  `;
}
